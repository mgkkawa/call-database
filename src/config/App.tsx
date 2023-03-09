import React from 'react'
import Header from './components/Header'
import Form from './components/Form'

const App = ({ config }: { config: PluginConfigProps }) => {
  return (
    <React.Fragment>
      <Header />
      <Form config={config} />
    </React.Fragment>
  )
}

export default App
