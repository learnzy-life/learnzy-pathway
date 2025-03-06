
import { useState, useEffect } from 'react'

export const useTestTimer = (
  initialTime: number,
  onTimeExpired: () => void
): [number, (seconds: number) => string] => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeExpired()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeExpired])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      secs < 10 ? '0' : ''
    }${secs}`
  }

  return [timeRemaining, formatTime]
}
