import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import HttpsRedirect from 'react-https-redirect'
import configureStore from './store/_store'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.min.css'
import './assets/scss/custom.scss'
import './index.css'

const store = configureStore()
Sentry.init({
  dsn: 'https://92c52a6552f34804a354544361f74c04@o550733.ingest.sentry.io/6661215',
  integrations: [new BrowserTracing()],
  environment: process.env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <HttpsRedirect>
      <App />
    </HttpsRedirect>
  </Provider>
)
reportWebVitals()

// serviceWorker.unregister();
