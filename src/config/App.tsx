import React from 'react'
import Form from './components/Form'

const App = ({ config }: { config: PluginConfigProps }) => {
  return (
    <React.StrictMode>
      <Form config={config} />
    </React.StrictMode>
  )
}

export default App
