'use client'

import { useState, useEffect } from 'react'

export default function SplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded state after iframe loads
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <div
        className={`w-full h-full transition-opacity duration-1500 ${
          isLoaded ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <iframe
          src="https://my.spline.design/greenbuildingdimensions-K2kHZH0WuHAsSyT8uiNKfRHL/"
          className="w-full h-full border-0"
          title="3D Background"
        />
      </div>
    </div>
  )
}
