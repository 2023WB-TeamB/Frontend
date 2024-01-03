import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MyDocPage from './pages/MyDocPage'
import ViewerPage from './pages/ViewerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mydoc" element={<MyDocPage />} />
        <Route path="/viewer" element={<ViewerPage />} />
      </Routes>
    </Router>
  )
}

export default App
