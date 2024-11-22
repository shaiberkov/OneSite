import './LeagueHistory.css';
import React, { useState } from 'react';
const LeagueHistory = (props) => {
    const maxRound=props.getMaxLeagueCycle();
    const halfRound = Math.floor(maxRound / 2);
    const [minCycle, setMinCycle] = useState(1);
    const [maxCycle, setMaxCycle] = useState(maxRound);
    const [showButtons, setShowButtons] = useState(false);
    const [buttonRange, setButtonRange] = useState([]);
    const [games, setGames] = useState([]);

    const handleMinCycleChange = (e) => {
        const value = Number(e.target.value);
        if (value <= maxCycle) {
            setMinCycle(value);
        }
    };

    const handleMaxCycleChange = (e) => {
        const value = Number(e.target.value);
        if (value >= minCycle) {
            setMaxCycle(value);
        }
    };

    const createButtonsForRange = () => {
        let buttons = [];
        for (let i = minCycle; i <= maxCycle; i++) {
            buttons.push(<button onClick={() =>handleLeagueGamesByRound(i)}>{i}</button>);
        }
        return buttons;
    };
    const handleLeagueGamesByRound = (round) => {
        const results = props.getLeagueGamesByRound(round); // קבלת המשחקים
        setGames(results);
    };
    const handleFilterClick = () => {
        setShowButtons(true);
        setButtonRange(createButtonsForRange(minCycle, maxCycle));
    };

//
    return (
        <div className="league-history">
            {props.players.length === 0 && (
                <div>
                    <div className="league-data">
                        <div className="matches-header">League Data - {props.chosenLeague.name}</div>
                        {/*<h2>League Data - {props.chosenLeague.name}</h2>*/}
                    </div>

                    <div>
                    <h1> Choose League Cycle between 1 to {maxRound}</h1>

                        <input
                            type="number"
                            min="1"
                            max={maxCycle}
                            value={minCycle}
                            onChange={handleMinCycleChange}
                        />
                        <input
                            type="number"
                            min={minCycle}
                            max={maxRound}
                            value={maxCycle}
                            onChange={handleMaxCycleChange}
                        />

                        <div>
                            <button onClick={handleFilterClick}>Filter</button>
                        </div>
                        <div className="matches-section">
                            <h1>Matches</h1>
                            <div>
                                {showButtons && (
                                    <div>
                                        <div className="button-range">
                                            {buttonRange}
                                        </div>
                                        <div className="match-list">
                                            {games}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeagueHistory;





