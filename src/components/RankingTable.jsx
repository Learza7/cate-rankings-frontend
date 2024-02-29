import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TournamentList from './TournamentList';
import '../styles/RankingTable.css'

import Loading from './Loading';
import TournamentModal from './TournamentModal';

Modal.setAppElement('#root');

function RankingTable() {
  const [loading, setLoading] = useState(true);

  const [players, setPlayers] = useState([]);

  const [sortConfig, setSortConfig] = useState({
    field: 'lastName',
    direction: 'descending',
  });

  const [tournamentModalOpen, setTournamentModalOpen] = useState(false);  // this is the modal that opens when you click on a player's elo in the table if variation
  const [selectedPlayer, setSelectedPlayer] = useState(null);  // this is the player that is selected when you click on a player's elo in the table if variation
  const [selectedTimeControl, setSelectedTimeControl] = useState(null);  // this is the time control that is selected when you click on a player's elo in the table if variation

  useEffect(() => {

    fetch("https://cate-rankings-backend.herokuapp.com/players")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      });
  }, []);

  const sortData = (field) => {
    let direction = 'descending';
    if (sortConfig && sortConfig.field === field && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ field, direction });
  };
  
  const sortedPlayers = players.slice().sort((a, b) => {
    if (!sortConfig) {
      return 0;
    }
    const fieldA = a[sortConfig.field];
    const fieldB = b[sortConfig.field];
    if (sortConfig.field === 'lastName') {
      // For 'Name' field, reverse the sorting direction by default
      if (fieldA < fieldB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      if (fieldA > fieldB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
    } else {
      // For other fields, use the specified sorting direction
      if (fieldA < fieldB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });
  

  const openModal = (player, timeControl) => {

    // setSelectedPlayer(player);
    // setSelectedTimeControl(timeControl);

    // setTournamentModalOpen(true);

    
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
          <div className="mt-28"><Loading /></div>
          
        ) : (
          <div className="md:overflow-x-clip rounded-lg shadow-lg overflow-x-clip">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 sticky top-0 md:text-lg text-sm">
                <tr>
                  <th scope="col" className="pl-4 px-1 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('lastName')}>
                    Name<span className="inline-block">{sortConfig && sortConfig.field === 'lastName' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                  </th>
                  <th scope="col" className="px-1 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('classical')}>
                    Classical<span className="inline-bldock">{sortConfig && sortConfig.field === 'classical' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                  </th>
                  <th scope="col" className="px-1 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('rapid')}>
                    Rapid<span className="inline-block">{sortConfig && sortConfig.field === 'rapid' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                  </th>
                  <th scope="col" className="pr-4 px-1 md:px-6 py-3 text-left md:text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hidden sm:block" onClick={() => sortData('blitz')}>
                    Blitz<span className="inline-block">{sortConfig && sortConfig.field === 'blitz' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPlayers.map((player, index) => (
                  <tr key={player.fideId} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200 md:text-lg text-m`}>
                    <td className="md:px-6 px-1 pl-2 py-4 whitespace-wrap text-gray-800">{`${player.lastName} ${player.firstName}`}</td>
                    <td className={`md:px-6 px-1 py-4 whitespace-nowrap text-gray-800 ${player.classicalVariation !== 0 ? "cursor-pointer" : ""}`} onClick={() => player.classicalVariation !== 0 && openModal(player, 0)}>
                      {`${player.classical != null ? player.classical : ""}`}
                      <span className={`${player.classicalVariation > 0 ? "text-green-500" : "text-red-500"} text-base`}>
                        {player.classicalVariation !== 0 ? ' (' + (player.classicalVariation > 0 ? '↑' : '↓') + Math.abs(player.classicalVariation) + ')' : ''}
                      </span>
                    </td>
                    <td className={`md:px-6 px-1 py-4 whitespace-nowrap text-gray-800 ${player.rapidVariation !== 0 ? "cursor-pointer" : ""}`} onClick={() => player.rapidVariation !== 0 && openModal(player, 1)}>
                      {`${player.rapid != null ? player.rapid : ""}`}
                      <span className={`${player.rapidVariation > 0 ? "text-green-500" : "text-red-500"} text-base`}>
                        {player.rapidVariation !== 0 ? ' (' + (player.rapidVariation > 0 ? '↑' : '↓') + Math.abs(player.rapidVariation) + ')' : ''}
                      </span>
                    </td>
                    <td className={`sm:block px-1 md:px-6 py-4 whitespace-nowrap text-gray-800 hidden ${player.blitzVariation !== 0 ? "cursor-pointer" : ""}`} onClick={() => player.blitzVariation !== 0 && openModal(player, 2)}>
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



      <TournamentModal show={tournamentModalOpen} player={selectedPlayer} timeControl={selectedTimeControl} onClose={() => setTournamentModalOpen(false)}/>
    </>
  );
}

export default RankingTable;