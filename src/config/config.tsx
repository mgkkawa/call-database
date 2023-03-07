import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { getConfig } from '../common'
import App from './App'

const PLUGIN_ID = kintone.$PLUGIN_ID
export const config = getConfig(PLUGIN_ID)
export const ConfigContext = createContext(config)

const container = document.getElementById('config-root') as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(<App config={config} />)
