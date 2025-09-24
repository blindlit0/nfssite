import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Welfare from './pages/Welfare'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="welfare" element={<Welfare />} />
      </Route>
    </Routes>
  )
}

export default App
