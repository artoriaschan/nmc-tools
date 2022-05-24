import { useState, useCallback } from 'react'
import logo from '../assets/logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const login = useCallback(async () => {
    try {
      const res = await window.api.login({
        email: '',
        password: ''
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!111</p>
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
          <button type="button" onClick={login}>
            登录
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
