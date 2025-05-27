"use client"

import { useState } from "react"
import Image from "next/image"
import { User } from "lucide-react"

interface Props {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackSrc?: string
  showInitials?: boolean
}

const AvatarFallback = ({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/placeholder.svg",
  showInitials = true,
}: Props) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Extract initials from alt text for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle image load error
  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  // Handle successful image load
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  // If no URL provided, show fallback immediately
  if (!src || src.trim() === "") {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-full ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {showInitials && alt ? (
          <span className="font-semibold text-gray-600" style={{ fontSize: `${Math.max(width * 0.3, 12)}px` }}>
            {getInitials(alt)}
          </span>
        ) : (
          <User className="text-gray-500" size={Math.max(width * 0.5, 16)} />
        )}
      </div>
    )
  }

  // If image failed to load, show fallback
  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-full ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Image
        src={ fallbackSrc}
        width={width}
        height={height}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        priority={width > 100} // Prioritize larger avatars
      />
      </div>
    )
  }

  return (
    <
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      )}

      {/* Main image */}
      <Image
        src={src || fallbackSrc}
        width={width}
        height={height}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        priority={width > 100} // Prioritize larger avatars
      />
    </>
  )
}

export default AvatarFallback
