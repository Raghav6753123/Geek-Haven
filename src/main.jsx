import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QuestionProvider } from './QuestionContext/questionContext.jsx'
import { AuthProvider } from './AuthContext/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <QuestionProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QuestionProvider>
    </BrowserRouter>
  </StrictMode>
)
