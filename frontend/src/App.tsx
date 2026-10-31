import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Translator from './pages/Translator'
import Practice from './pages/Practice'
import Phrasebook from './pages/Phrasebook'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/translate" element={<Translator />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/phrasebook" element={<Phrasebook />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
