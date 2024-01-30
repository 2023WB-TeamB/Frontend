import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MyDocsPage from './pages/MyDocsPage'
import ViewerPage from './pages/ViewerPage'
import SharedDocPage from './pages/SharedDocPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mydocs" element={<MyDocsPage />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="/share/:id" element={<SharedDocPage />} />
      </Routes>
    </Router>
  )
}
export default App
