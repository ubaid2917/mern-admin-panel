import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import Dashboard from './components/Dashboard'
import Topbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Topbar />
        <Dashboard  />
        <Sidebar  />

    </>
  )
}

export default App
