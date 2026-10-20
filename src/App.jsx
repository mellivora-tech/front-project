import { useEffect, useState } from 'react'
import MeshHome from './mesh/MeshHome.jsx'
import MeshTemplates from './mesh/MeshTemplates.jsx'
import MeshShell from './mesh/MeshShell.jsx'
import RouteProgress from './mesh/RouteProgress.jsx'

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const isTemplates = route === '#templates'
  return (
    <>
      <RouteProgress />
      <MeshShell active={isTemplates ? 'Templates' : 'Home'}>
        <div key={route} className="flex min-h-0 flex-1 flex-col animate-in fade-in slide-in-from-bottom-1 duration-200">
          {isTemplates ? <MeshTemplates /> : <MeshHome />}
        </div>
      </MeshShell>
    </>
  )
}
