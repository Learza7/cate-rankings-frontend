import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TournamentList from './TournamentList';
import './RankingTable.css';

Modal.setAppElement('#root');

function RankingTable() {
  const [players, setPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("https://cate-rankings-backend.herokuapp.com/players")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      });
  }, []);

  const sortData = (field) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.field === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ field, direction });
  };

  const sortedPlayers = players.slice().sort((a, b) => {
    if (!sortConfig) {
      return 0;
    }
    const fieldA = a[sortConfig.field];
    const fieldB = b[sortConfig.field];
    if (fieldA < fieldB) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const openModal = (player) => {
    console.log(player);  // logs the player when the modal opens

    fetch(`https://cate-rankings-backend.herokuapp.com/players/${player.fideId}/tournaments`)
      .then((response) => response.json())
      .then((data) => {
        // Add the tournaments data to the player object, and then set it as currentPlayer
        const playerWithTournaments = { ...player, tournaments: data };
        console.log(playerWithTournaments);  // logs the player with the tournaments data
        setCurrentPlayer(playerWithTournaments);
      });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentPlayer(null);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1rem',
      width: '100%',
      maxWidth: '1000px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
  };


  return (
    <>


      {
        loading ? (
          <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 shadow-md bg-white bg-opacity-20"></div>
      </div>
        ) : (
          <div className="overflow-x-scroll md:overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200 sticky top-0">
                <tr>
                <th scope="col" className="px-2 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('lastName')}>
                  Name<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'lastName' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                </th>
                  <th scope="col" className="px-2 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('classical')}>
                    Classical<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'classical' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                  </th>
                  <th scope="col" className="px-2 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('rapid')}>
                    Rapid<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'rapid' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                  </th>
                  <th scope="col" className="px-2 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('blitz')}>
                    Blitz<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'blitz' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPlayers.map((player, index) => (
                  <tr key={player.fideId} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{`${player.lastName} ${player.firstName}`}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-gray-800 ${player.classicalVariation !== 0 ? "cursor-pointer" : ""}`} onClick={() => player.classicalVariation !== 0 && openModal(player)}>
                      {`${player.classical != null ? player.classical : ""}`}
                      <span className={`${player.classicalVariation > 0 ? "text-green-500" : "text-red-500"} text-base`}>
                        {player.classicalVariation !== 0 ? ' (' + (player.classicalVariation > 0 ? '↑' : '↓') + Math.abs(player.classicalVariation) + ')' : ''}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-gray-800 ${player.rapidVariation !== 0 ? "cursor-pointer" : ""}`} onClick={() => player.rapidVariation !== 0 && openModal(player)}>
                      {`${player.rapid != null ? player.rapid : ""}`}
                      <span className={`${player.rapidVariation > 0 ? "text-green-500" : "text-red-500"} text-base`}>
                        {player.rapidVariation !== 0 ? ' (' + (player.rapidVariation > 0 ? '↑' : '↓') + Math.abs(player.rapidVariation) + ')' : ''}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-gray-800 ${player.blitzVariation !== 0 ? "cursor-pointer" : ""}`} onClick={() => player.blitzVariation !== 0 && openModal(player)}>
                      {`${player.blitz != null ? player.blitz : ""}`}
                      <span className={`${player.blitzVariation > 0 ? "text-green-500" : "text-red-500"} text-base`}>
                        {player.blitzVariation !== 0 ? ' (' + (player.blitzVariation > 0 ? '↑' : '↓') + Math.abs(player.blitzVariation) + ')' : ''}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>


            </table>
          </div>)
      }



      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Player Details"
        style={customStyles}
      >
        {currentPlayer &&
          <div className="relative">
            {/* <h2>{`${currentPlayer.lastName} ${currentPlayer.firstName}`}</h2> */}
            <TournamentList tournaments={currentPlayer.tournaments} />
            {/* <button 
        onClick={closeModal} 
        className="absolute top-1 right-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200"
      >
        X
      </button> */}
          </div>
        }
      </Modal>
    </>
  );
}

export default RankingTable;