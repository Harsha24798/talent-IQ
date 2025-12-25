import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router'

function App() {


  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
    </Routes>
  )
}

export default App
