import RankingTable from './components/RankingTable'
// import routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChessliPage from './ChessliPage'
import './App.css'

function App () {
  return (
    <div className='flex justify-center h-screen font-sans'>
      <div className='flex flex-col items-center'>
        <h1 className='md:text-6xl font-bold text-gray-800 m-4 text-4xl text-center'>
          CATE RANKINGS
        </h1>
        <Router>
          <Routes>
            <Route path='/transfer' element={<ChessliPage />} />
            <Route path='/' element={<RankingTable />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}
export default App
