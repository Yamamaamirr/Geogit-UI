import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RepoPage from './components/Repositories/RepoPage'
 import "./index.css"; // Make sure the path is correct



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RepoPage/>
    </>
  )
}

export default App
