import '../styles/TournamentModal.css'
import { useState, useEffect } from 'react';
import Loading from './Loading';

function TournamentModal(props) {


    const [tournaments, setTournaments] = useState([])

    // on modal opening ie show = true, fetch the tournaments for the player
    useEffect(() => {
        if (!props.show) {
            setTimeout(() => setTournaments([]), 500);
            return;
        }

        fetch(`https://cate-rankings-backend.herokuapp.com/players/${props.player.fideId}/tournaments`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data[props.timeControl])
                setTournaments(data[props.timeControl]);
            });


    }, [props.show]);



    return (
        // <div className="modal active"  onClick={props.onClose}>
        //     <div className="modal-content" onClick={e => e.stopPropagation()}>
        //         <div className="modal-header">
        //             <h4 className="modal-title">Modal Header</h4>
        //         </div>
        //         <div className="modal-body">
        //             <p>Some text in the modal.</p>
        //         </div>
        //         <div className="modal-footer">
        //             <button onClick={props.onClose} className="button">Close</button>
        //         </div>
        //     </div>

        // </div>
        <div className={`modal-overlay ${props.show ? "active" : ""}`} onClick={props.onClose}>
            <div className={`modal ${props.show ? "active" : ""}`} onClick={e => e.stopPropagation()}>
                {/* <a className="close-modal" >
                    <svg viewBox="0 0 20 20">
                        <path fill="#000000" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                    </svg>
                </a> */}
                {tournaments.length === 0 ? <Loading /> :
                    (<div className="modal-content overflow-y-auto max-h-screen space-y-4">
                        {/* for each tournament print something */}
                        {tournaments.map((tournament) => (
                            <div key={tournament.id} className="p-4 bg-gray-100 rounded-lg shadow-mds">
                                <h2 className="text-xl font-bold text-gray-700 mb-4">{tournament.name} - {new Date(tournament.date).toLocaleDateString()}</h2>
                                <div className="mt-2 align-middle inline-block min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border-b border-gray-200 sm:table">

                                    <div className="hidden sm:table-row-group">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Opponent Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Opponent Elo</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Color</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Result</th>
                                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Change</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {tournament.games.map((game, index) => (
                                                    <tr key={game.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.OpponentName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.OpponentElo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <div className={`h-4 w-4 rounded-full ${game.color === 'w' ? 'bg-white border-2 border-gray-200' : 'bg-black'}`}></div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text- text-gray-900">
                                                            {game.Result === 0 ? '❌' : game.Result === 0.5 ? '🤝' : '✅'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{game.change}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Cards for small screens */}
                                    <div className="sm:hidden grid grid-cols-2 gap-4">
                                        {tournament.games.map((game, index) => (
                                            <div key={game.id} className="p-4 bg-white divide-y divide-gray-200 rounded-lg shadow-sm">
                                                <h3 className="text-md leading-6 font-medium text-gray-800">
                                                    Game #{index + 1}
                                                </h3>
                                                <div className="mt-2 text-sm text-gray-600 space-y-2">
                                                    <div><span className="font-medium"></span> {game.OpponentName + ' (' + game.OpponentElo + ')'}</div>
                                                    <div><span className="font-medium">Color:</span>
                                                        <div className={`h-4 w-4 inline-block rounded-full ml-2 ${game.color === 'w' ? 'bg-white border-2 border-gray-200' : 'bg-black'}`}></div>
                                                    </div>
                                                    <div><span className="font-medium">Result:</span> {game.Result === 0 ? '❌' : game.Result === 0.5 ? '🤝' : '✅'}</div>
                                                    <div><span className="font-medium">Change:</span> {game.change}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>


                        ))}
                    </div>)
                }

            </div>
        </div>
    )


}

export default TournamentModal;