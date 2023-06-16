import { useState } from 'react'
import RankingTable from './components/RankingTable'
import './App.css'

function App() {

  return (
    <div className='flex justify-center h-screen font-sans'>
      <div className='flex flex-col items-center'>
        <h1 className='md:text-6xl font-bold text-gray-800 m-4 text-4xl'>CATE RANKINGS</h1>
        <RankingTable />
      </div>

    </div>
  )
}

export default App
