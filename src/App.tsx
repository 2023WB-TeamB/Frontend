import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainPage from './pages/MainPage'
import MyDocsPage from './pages/MyDocsPage'
import ViewerPage from './pages/ViewerPage'

function App() {
  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mydocs" element={<MyDocsPage />} />
          <Route path="/viewer" element={<ViewerPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
