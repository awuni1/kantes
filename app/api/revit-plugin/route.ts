// app/api/revit-plugin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Initialize Resend
const resend = new Resend('re_5rgutMFk_9MSg4q1RAYVrGoJ27YZzqbfp')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email } = body

    // Validate required fields
    if (!name || !company || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to Supabase database
    const { data: savedData, error: dbError } = await supabase
      .from('revit_plugin_downloads')
      .insert([
        {
          name,
          company,
          email,
          downloaded_at: new Date().toISOString(),
        }
      ])
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save data to database' },
        { status: 500 }
      )
    }

    // Send email notification using Resend
    try {
      await resend.emails.send({
        from: 'Resend <onboarding@resend.dev>', // Replace with your verified domain
        to: 'owusudaneil007@gmail.com',
        subject: 'New Revit Plugin Download',
        html: `
          <h2>New Revit Plugin Download</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Downloaded at:</strong> ${new Date().toLocaleString()}</p>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Data saved successfully',
        data: { name, company, email }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing Revit plugin download:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to stream the file download from Google Cloud Storage
export async function GET(request: NextRequest) {
  try {
    // Google Cloud Storage public URL
    const cloudStorageUrl = 'https://storage.googleapis.com/kantes-downloads/Kantes-Revit-Setup.zip'
    
    try {
      // Fetch file from Google Cloud Storage
      const response = await fetch(cloudStorageUrl)
      
      if (!response.ok) {
        throw new Error(`Cloud Storage returned status ${response.status}`)
      }
      
      // Get the content length for progress tracking
      const contentLength = response.headers.get('content-length')
      
      // Stream the response body directly to the client
      return new NextResponse(response.body, {
        status: 200,
        headers: {
          'Content-Disposition': 'attachment; filename="Kantes-Revit-Setup.zip"',
          'Content-Type': 'application/zip',
          'Content-Length': contentLength || '',
          'Cache-Control': 'no-cache',
        },
      })
    } catch (fileError) {
      console.error('Download error:', fileError)
      return NextResponse.json(
        { error: 'Failed to download file from Cloud Storage. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    )
  }
}