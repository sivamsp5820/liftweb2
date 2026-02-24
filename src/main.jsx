import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import { ViewModeProvider } from './app/context/ViewModeContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ViewModeProvider>
            <App />
        </ViewModeProvider>
    </React.StrictMode>,
)
