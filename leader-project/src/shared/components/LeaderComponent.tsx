import Header from '../components/Navbars/HeaderNav'
import { Outlet } from 'react-router-dom'

function LeaderComponent() {
  return (
    <div>
        <header>
            <Header />
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default LeaderComponent