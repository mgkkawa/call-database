import React from 'react'
import config from '../../../../plugin/manifest.json'
const title = config.name.ja

type Props = {
  title: string
}

const Style: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 'bold',
}

export const Title = () => {
  return <h1 style={Style}>{title}</h1>
}
