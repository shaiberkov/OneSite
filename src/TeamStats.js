import React from 'react';
import './TeamStats.css';


const TeamStats = (props) => {


    return (

            <div className="team-stats">

                {props.players.length > 0 && (

                    <div className="stats-section">
                        <div className="matches-header">Stats</div>
                        <div className="stat-item">
                            {props.firstAndSecondRoundGoals()}
                        </div>
                        <div className="stat-item">
                            {props.roundsWithMostAndLastGoals()}
                        </div>
                        <div className="stat-item">
                            {props.earliestAndLastGoal()}
                        </div>
                    </div>
                )}
            </div>
    )
}
export default TeamStats;