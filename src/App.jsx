import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GeneratePage from './pages/GeneratePage'
import HistoryPage from './pages/HistoryPage'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<GeneratePage />} />
            <Route path='/generate' element={<GeneratePage />} />
            <Route path='/history' element={<HistoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
