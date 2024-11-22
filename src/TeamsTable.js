// // import React from 'react';
// // import './TeamsTable.css';
// // const TeamsTable = (props) => {
// //     const teams = props.teams;
// //     const players = props.players;
// //
// //     // return (
// //     return (
// //         <div className="teams-table">
// //             {teams.length > 0 && (
// //                 <div className="teams-list">
// //                     {teams.map((team) => (
// //                         <div
// //                             key={team.id}
// //                             className="team-card"
// //                             onClick={() => {
// //                                 props.getTeamPlayers(team.id);
// //                                 props.setSelectedTeam(team);
// //                             }}
// //                         >
// //                             <h3>{team.name}</h3>
// //
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //
// //             {players.length > 0 && (
// //                 <div className="players-section">
// //                     <div className="matches-header">Team Players</div>
// //                     <ul>
// //                         {players.map(player => (
// //                             <li key={player.id}>{player.firstName + " " + player.lastName}</li>
// //                         ))}
// //                     </ul>
// //                     <div className="matches-header">Matches</div>
// //
// //                     <div className="goals-format">
// //                         {props.getGoalsFormat()}
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// //     //     <div className="teams-table">
// //     //         {teams.length > 0 && (
// //     //             <div className="teams-list">
// //     //                 <table>
// //     //                     <thead>
// //     //                     <tr>
// //     //                         <th>Team Name</th>
// //     //                     </tr>
// //     //                     </thead>
// //     //                     <tbody>
// //     //                     {teams.map((team) => (
// //     //                         <tr key={team.id} onClick={() => {
// //     //                             props.getTeamPlayers(team.id);
// //     //                             props.setSelectedTeam(team);
// //     //                         }}>
// //     //                             <td>{team.name}</td>
// //     //                         </tr>
// //     //                     ))}
// //     //                     </tbody>
// //     //                 </table>
// //     //
// //     //             </div>)}
// //     //
// //     //         {players.length > 0 && (
// //     //             <div className="players-section">
// //     //                 <div>
// //     //                     <h2>שחקני הקבוצה:</h2>
// //     //                     <ul>
// //     //                         {players.map(player => (
// //     //                             <li key={player.id}>{player.firstName + " " + player.lastName}</li>
// //     //                         ))}
// //     //                     </ul>
// //     //                 </div>
// //     //                 <div className="goals-format">
// //     //                     {props.getGoalsFormat()}
// //     //                 </div>
// //     //             </div>
// //     //
// //     //         )
// //     //         }
// //     //
// //     //     </div>
// //     // )
// //     //     ;
// // };
// // export default TeamsTable;
// import React from 'react';
// import './TeamsTable.css';
//
// const TeamsTable = (props) => {
//     const teams = props.teams;
//     const players = props.players;
//
//     return (
//         <div className="teams-table">
//             {teams.length > 0 && (
//                 <div className="teams-list">
//                     {teams.map((team) => (
//                         <div
//                             key={team.id}
//                             className="team-card"
//                             onClick={() => {
//                                 props.getTeamPlayers(team.id);
//                                 props.setSelectedTeam(team);
//                             }}
//                         >
//                             <h3>{team.name}</h3>
//                         </div>
//                     ))}
//                 </div>
//             )}
//
//             {players.length > 0 && (
//                 <div className="players-section">
//                     <div className="matches-header">Team Players</div>
//                     <ul>
//                         {players.map(player => (
//                             <li key={player.id} className="player-item">
//                                 <span className="player-name">
//                                     {player.firstName + " " + player.lastName}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="matches-header">Matches</div>
//                     <div className="goals-format">
//                         {props.getGoalsFormat()}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default TeamsTable;
import React from 'react';
import './TeamsTable.css';

const TeamsTable = (props) => {
    const teams = props.teams;
    const players = props.players;

    return (
        <div className="teams-table">
            {teams.length > 0 && (
                <div className="teams-list">
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            className="team-card"
                            onClick={() => {
                                props.getTeamPlayers(team.id);
                                props.setSelectedTeam(team);
                            }}
                        >
                            <h3>{team.name}</h3>
                        </div>
                    ))}
                </div>
            )}

            {players.length > 0 && (
                <div className="players-section">
                    <div className="matches-header">Team Players</div>
                    <ul>
                        {players.map(player => (
                            <li key={player.id} className="player-item">
                                <span className="player-name">
                                    {player.firstName + " " + player.lastName}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="matches-header">Matches</div>
                    <div className="goals-format">
                        {props.getGoalsFormat()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamsTable;
