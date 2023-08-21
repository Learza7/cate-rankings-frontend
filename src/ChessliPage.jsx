import Loading from './components/Loading'
import React from 'react'

const ChessliPage = () => {
  const [lastGame, setLastGame] = React.useState(null)
  const [generatedUrl, setGeneratedUrl] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const getLastChessGame = e => {
    e.preventDefault()

    const form = e.target
    const username = form.username.value

    if (username === '') {
      return
    }

    setGeneratedUrl('')
    setLoading(true)
    setError('')

    const date = new Date()

    const year = date.getFullYear()
    const month = date.getMonth().toString().padStart(2, '0')

    fetch(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`)
      .then(response => {
        console.log(response)
        return response.json()
      })
      .catch(error => {
        console.log(error)
        setError(error.message)
        setLoading(false)
        return error
      })
      .then(data => {
        let lastGame = data.games[data.games.length - 1]

        setLastGame(lastGame)

        const formData = new URLSearchParams()
        formData.append('pgn', lastGame.pgn)

        fetch('https://api.allorigins.win/get?https://lichess.org/api/import', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            return response
          })
          .then(data => {
            console.log(data)
            setGeneratedUrl(data.url)
            setLoading(false)
          })
      })
      .catch(error => {
        console.log(error)
        setError('No game found for this username over the last month.')
        setLoading(false)
      })
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-semibold mb-4'>
        Enter your chess.com username:
      </h1>
      <form onSubmit={getLastChessGame} className='flex items-center'>
        <input
          type='text'
          id='username'
          name='username'
          className='border-2 border-gray-400 rounded-lg p-2 mr-2'
          placeholder='Your username'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-lg'
        >
          Submit
        </button>
      </form>

      {loading ? (
        <div className='mt-16'>
          <Loading />
        </div>
      ) : null}

      {generatedUrl ? (
        <div className='bg-white p-4 mt-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-2'>
            Here is your {lastGame.time_class} game:
          </h2>
          <p>
            {lastGame.white.username} vs {lastGame.black.username}
          </p>
          <a
            href={generatedUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 mt-2 block'
          >
            {generatedUrl}
          </a>
        </div>
      ) : null}

      {error ? (
        <div className='bg-red-500 text-white p-4 mt-4 rounded-lg shadow-md'>
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  )
}

export default ChessliPage
