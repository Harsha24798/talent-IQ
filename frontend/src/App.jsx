import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

function App() {
  
  const { isSignedIn } = useUser();

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/problem' element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App
