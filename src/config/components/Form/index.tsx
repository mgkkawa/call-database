import React from 'react'
import ConfigForm from './ConfigForm'

export default function Form({ config }: { config: PluginConfigProps }) {
  return <ConfigForm {...config} />
}
