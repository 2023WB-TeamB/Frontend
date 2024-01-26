import { useEffect, useState } from 'react'
// 일정시간동안 연속적으로 발생되는 이벤트 중에서
// 마지막만 호출하여 과도한 호출이나 렌더링을 막는 방법
const useDebounce = (value: string, delay: number): string => {
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
