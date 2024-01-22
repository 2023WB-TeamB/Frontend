import { useEffect, useState } from 'react'

const useDebounce = (value: any, delay: number): string => {
  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
