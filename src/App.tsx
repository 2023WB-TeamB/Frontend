import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainPage from './pages/MainPage'
import MyDocsPage from './pages/MyDocsPage'
import ViewerPage from './pages/ViewerPage'
import SharedDocPage from './pages/SharedDocPage'

function App() {
  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mydocs" element={<MyDocsPage />} />
          <Route path="/viewer" element={<ViewerPage />} />
          <Route path="/share/:id" element={<SharedDocPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}
export default App
