import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const PLUGIN_ID = kintone.$PLUGIN_ID
const appId = kintone.app.getId() as number
export const PluginContext = createContext(PLUGIN_ID)
export const AppIdContext = createContext(String(appId))

const container = document.getElementById('config-root') as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(<App />)
