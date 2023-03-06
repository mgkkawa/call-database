import React, { useEffect, useState } from 'react'
import config from '../../../../plugin/manifest.json'
const desc: string = config.description.ja

type Props = {
  text?: string
}

const Style: React.CSSProperties = {
  fontSize: 14,
  color: '#999',
}

export const Description = ({ text }: Props) => {
  const [textArray, setTextArray] = useState<string[]>([])
  useEffect(() => {
    if (!text) {
      setTextArray([desc])
      return
    }
    if (text.includes('\n')) {
      setTextArray(() => text.split('\n'))
      return
    }
    setTextArray([text])
  }, [])

  return (
    <div style={Style}>
      {textArray.map((row, key) => (
        <div key={key}>{row}</div>
      ))}
    </div>
  )
}
