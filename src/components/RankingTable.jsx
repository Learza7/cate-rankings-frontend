import React, { useState, useEffect } from "react";
import Modal from "react-modal"

function RankingTable() {
  const [players, setPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/players")
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  }, []);

  // Sort function
  const sortData = (field) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.field === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedPlayers = [...players].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setPlayers(sortedPlayers);
    setSortConfig({ field, direction });
  };

  return (
  
    <>
    {/* <Modal isOpen={true} ariaHideApp={false} onRequestClose={}>
      hey
      </Modal> */}
      <div className="overflow-hidden shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('lastName')}>
                Name<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'lastName' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('classical')}>
                Classical<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'classical' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('rapid')}>
                Rapid<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'rapid' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-m font-semibold text-gray-600 uppercase tracking-wider cursor-pointer" onClick={() => sortData('blitz')}>
                Blitz<span className="inline-block ml-2">{sortConfig && sortConfig.field === 'blitz' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '  '}</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player, index) => (
              <tr key={player.fideId} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{`${player.lastName} ${player.firstName}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{player.classical}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{player.rapid}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">{player.blitz}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RankingTable;
