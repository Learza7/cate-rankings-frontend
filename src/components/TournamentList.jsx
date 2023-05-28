function TournamentList({ tournaments }) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-auto max-h-screen">
            {tournaments.map((tournament) => (
                <div key={tournament.id} className="flow-root mt-0">
                    <h2 className="text-xl font-bold text-gray-900">{tournament.name} - {new Date(tournament.date).toLocaleDateString()}</h2>
                    <div className="mt-2 align-middle inline-block min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
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
                </div>
            ))}
        </div>
    );
}

export default TournamentList;
