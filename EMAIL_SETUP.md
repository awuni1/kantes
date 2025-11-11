# Email Setup for Waitlist Submissions

The waitlist form currently logs submissions to the console. To send emails to **info@kantes.com**, follow one of these options:

## Option 1: Resend (Recommended - Easy Setup)

Resend is a modern email API with a generous free tier (100 emails/day).

### Steps:
1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Install Resend:
   ```bash
   npm install resend
   ```

4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

5. Uncomment the Resend code in `/app/api/waitlist/route.ts` (lines 27-34)

6. Update the code:
   ```typescript
   import { Resend } from 'resend'

   const resend = new Resend(process.env.RESEND_API_KEY)

   await resend.emails.send({
     from: 'Kantes Waitlist <onboarding@resend.dev>',
     to: 'info@kantes.com',
     subject: 'New Waitlist Signup',
     text: emailContent,
   })
   ```

## Option 2: Nodemailer with SMTP

If you have an existing email server (Gmail, Outlook, custom SMTP).

### Steps:
1. Install Nodemailer:
   ```bash
   npm install nodemailer
   npm install -D @types/nodemailer
   ```

2. Add to `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=Kantes Waitlist <your-email@gmail.com>
   ```

3. Uncomment the Nodemailer code in `/app/api/waitlist/route.ts` (lines 36-53)

### Gmail Setup:
- Enable 2-factor authentication
- Generate an "App Password" in Google Account settings
- Use the app password in `SMTP_PASS`

## Testing

After setup, test the waitlist form:
1. Go to `http://localhost:3000/waitlist`
2. Fill out the form
3. Check info@kantes.com for the email
4. Check console logs if there are issues

## Current Behavior

Without email setup:
- Form submissions are logged to console
- API returns success response
- User sees success message
- No emails are sent yet

The form is fully functional and ready for email integration!
