import React, { useEffect, useState } from 'react'

function Loading() {
  const [point, setPoint] = useState<string[]>([])

  useEffect(() => {
    setTimeout(() => {
      setPoint(prevPoint => {
        if (prevPoint.length === 3) return []
        return [...prevPoint, '.']
      })
    }, 800)
  }, [point])

  return <div>{'Loading' + point.join('')}</div>
}

export default Loading
