import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MyDocsPage from './pages/MyDocsPage'
import ViewerPage from './pages/ViewerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mydocs" element={<MyDocsPage />} />
        <Route path="/viewer" element={<ViewerPage />} />
      </Routes>
    </Router>
  )
}

export default App
