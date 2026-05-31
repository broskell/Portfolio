import { useEffect, useState } from 'react'

export function useTypingEffect(strings, typingSpeed = 55, pauseDuration = 1500, deletingSpeed = 35) {
  const [displayText, setDisplayText] = useState('')
  const [stringIndex, setStringIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!strings?.length) return

    const current = strings[stringIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setDisplayText(current.slice(0, charIndex + 1))
            setCharIndex((c) => c + 1)
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else if (charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        } else {
          setIsDeleting(false)
          setStringIndex((i) => (i + 1) % strings.length)
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, stringIndex, strings, typingSpeed, pauseDuration, deletingSpeed])

  return displayText
}
