import React from 'react';
import './LeagueTable.css';
import TeamsTable from './TeamsTable';

const LeagueTable = (props) => {
    const leagues=props.leagues;




    return (
        <div className="league-table">
            <h2>League Names</h2>
            <table>
                <thead>
                <tr>
                    <th>League Name</th>
                </tr>
                </thead>
                <tbody>
                {/* מיפוי הנתונים ליצירת שורות טבלה */}
                {leagues.map((league) => (
                    <tr key={league.id} onClick={() => {
                        props.onLeagueSelect(league.id);
                        props.setChosenLeague(league);
                        props.clearPlayers();
                    }}>
                        <td>{league.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {props.players.length === 0 && (<div>
                {props.topScorers.length > 0 && (
                    <div className="top-scorers">
                        <div className="matches-header">Top 3 Scorers</div>
                        <ul>
                        {props.topScorers.map(([name, count]) => (

                                <li key={name}>
                                    {name}: {count}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>)}


        </div>
    );
};


export default LeagueTable;