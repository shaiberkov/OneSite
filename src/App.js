import './App.css';
import axios from "axios";
import React from 'react';
import LeagueTable from './LeagueTable';
import TeamsTable from './TeamsTable';
import TeamStats from "./TeamStats";
import LeagueHistory from "./LeagueHistory";


class App extends React.Component{
  state = {
    selectedTeam: null,
    leagues:[],
      leagueHistory:[],
    teams: [],
    teamHistory: [],
    players:[],
    topScorers: [],
    generalStats: {},
      nameCounts: {},
      chosenLeague: null,
    rounds: 7, // לדוגמה
  };
  getAllScorers = () => {
      const allScorers = [];
      this.state.leagueHistory.map(item => {
          const scorerData = item.goals;
                scorerData.map(goal => {
                    allScorers.push(goal.scorer.firstName+" "+goal.scorer.lastName);
                })
          }
      )

      return allScorers;
  }
    // פונקציה לספירת שמות במערך
    countNames = (namesArray) => {
        const nameCounts = {};

        namesArray.forEach((name) => {
            if (nameCounts[name]) {
                nameCounts[name] += 1;
            } else {
                nameCounts[name] = 1;
            }
        });

        return nameCounts;
    };

    // פונקציה לקבלת שלושת השמות עם הספירה הגבוהה ביותר
    getTopThreeNames = (nameCounts) => {
        const sortedNames = Object.entries(nameCounts)
            .sort(([, countA], [, countB]) => countB - countA) // ממיינים לפי ספירה
            .slice(0, 3); // לוקחים את שלושת השמות הראשונים

        return sortedNames; // מחזירים את השמות ואת הספירות
    };

    // עדכון ה-State עם הספירות והשמות המובילים לאחר קבלת היסטוריית הליגה
    updateNameCounts = () => {
        const namesArray = this.getAllScorers();
        const nameCounts = this.countNames(namesArray);
        const topThreeNames = this.getTopThreeNames(nameCounts);
        console.log(topThreeNames);
        this.setState({
            nameCounts,
            topScorers: topThreeNames
        });
    }
    getLeagueHistory = () => {

        axios.get("https://app.seker.live/fm1/history/"+this.state.chosenLeague.id)
            .then(res => {
                this.setState({leagueHistory:res.data},() => {
                    this.updateNameCounts(); // עדכון הספירות לאחר קבלת הנתונים
                });
            })
    }



    getLeagues = () => {
        axios.get("https://app.seker.live/fm1/leagues")
            .then(res => {
               this.setState({leagues:res.data});
            })
    }

    componentDidMount() {
        this.getLeagues();
    }
    getTeamsByLeague = (id) => {

        axios.get("https://app.seker.live/fm1/teams/"+id)
            .then(res => {
                this.setState({teams:res.data});
            })
    }
    getHistory = () => {
        axios.get("https://app.seker.live/fm1/history/"+this.state.chosenLeague.id+"/"+this.state.selectedTeam.id)
            .then(res => {
                this.setState({ teamHistory: res.data });
            })
    }

    setChosenLeague = (league) => {
        this.setState( {chosenLeague: league}, () => {
            this.getLeagueHistory();
        });
    }


    setSelectedTeam = (team) => {
        this.setState({ selectedTeam: team }, () => {
            if (team) {
                this.getHistory();
            }
        });
    };

    getTeamPlayers = (teamId) => {
        axios.get("https://app.seker.live/fm1/squad/"+this.state.chosenLeague.id+"/"+teamId)
            .then(res => {
                this.setState({players:res.data});
            })
    }
    getGoalsFormat = () => {
        const results = this.state.teamHistory.map(match => {
            // גישה לשמות הקבוצות ישירות, מכיוון ש-homeTeam ו-awayTeam אינם מערכים
            const homeTeam = match.homeTeam.name; // הסרת [0]
            const awayTeam = match.awayTeam.name; // הסרת [0]

            const goalsData = match.goals || []; // ודא ש-goals קיים
            let homeGoals=0;
            let awayGoals=0;
            goalsData.map(goal => {
                if(goal.home){
                    homeGoals++;
                }
                else {
                    awayGoals++;
                }
            })

            return (
                // <div>
                //     {homeTeam} {homeGoals} – {awayGoals} {awayTeam}
                // </div>
                <div key={match.id} className="match-item">
                    <div className="match-header">
                        <span className="home-team">{homeTeam}</span>
                        <span className="away-team">{awayTeam}</span>
                    </div>
                    <div className="score">{homeGoals} – {awayGoals}</div>
                </div>
            );
        });

        return <div>{results}</div>;
    };
    earliestAndLastGoal = () => {
        const allGoalsMinutes = []
        this.state.teamHistory.map(match => {
            const goalsData = match.goals
            goalsData.map(goal => {
                allGoalsMinutes.push(goal.minute)
            })
        })
        const sortedMinutes = allGoalsMinutes.sort((a, b) => a - b);
        const earliestMinute=sortedMinutes[0];
        const lastMinute=sortedMinutes[sortedMinutes.length-1];
        return (
            <div>
                <div>The earliest goal minute {earliestMinute}</div>
                <div>The last goal minute {lastMinute}</div>
            </div>

        )

    }
    roundsWithMostAndLastGoals=()=>{
        const goalsEachRound=[];
        this.state.teamHistory.map(match => {
            goalsEachRound.push(match.goals.length);
                //TODO עובד
        })
        const roundWithMostGoals=this.getIndexOfHighestValueInArray(goalsEachRound);
        const roundWithLeastGoals=this.getIndexOfLowestValueInArray(goalsEachRound);
        return (
            <div>
                <div>The round with most goals:{roundWithMostGoals}</div>
                <div>The round with least goals:{roundWithLeastGoals}</div>
            </div>
        )
    }
    getIndexOfHighestValueInArray = (arr) =>{
        let indexOfHighestValue = 0;
        let highestValue=arr[0];
        arr.forEach((number, index) => {
            if (number > highestValue) {
                highestValue = number;
                indexOfHighestValue = index;
            }
        });
        return indexOfHighestValue+1;
    }
    getIndexOfLowestValueInArray=(arr)=>{
        let indexOfLowestValue = 0;
        let lowestValue=arr[0];
        arr.forEach((number, index) => {
            if (number < lowestValue) {
                lowestValue = number;
                indexOfLowestValue = index;
            }
        });
        return indexOfLowestValue+1;
    }
    firstAndSecondRoundGoals=()=>{
        let firstHalfGoals=0;
        let secondHalfGoals=0;
        this.state.teamHistory.map(match => {
            const goalsData = match.goals
            goalsData.map(goal => {
                if(goal.minute<=45){
                    firstHalfGoals++;
                }
                else {
                    secondHalfGoals++;
                }
            })
        })
        return (
            <div>first half goals:{firstHalfGoals} VS second half goals:{secondHalfGoals} </div>
        )

    }
    getMinLeagueCycle=()=>{
        return 1;
    }
    getMaxLeagueCycle=()=>{
        if(this.state.leagueHistory && this.state.leagueHistory.length > 0){
            const last=this.state.leagueHistory[this.state.leagueHistory.length-1];
            return last.round;
        }
    }
    // getLeagueGamesByRound=(round)=>{
    //     const results = this.state.leagueHistory
    //         .filter(match => match.round === round)
    //         .map(match => {
    //         const homeTeam = match.homeTeam.name;
    //         const awayTeam = match.awayTeam.name;
    //         const goalsData = match.goals;
    //         let homeGoals = 0;
    //         let awayGoals = 0;
    //
    //         goalsData.forEach(goal => {
    //             if (goal.home) {
    //                 homeGoals++;
    //             } else {
    //                 awayGoals++;
    //             }
    //         });
    //         return (
    //             <div className="stat">
    //                 {homeTeam} {homeGoals} – {awayGoals} {awayTeam}
    //             </div>
    //         );
    //     });
    //
    //     return <div>{results}</div>;
    //
    // }
    // App.js (חלק מהקוד שרלוונטי ל-LeagueHistory)

    getLeagueGamesByRound = (round) => {
        const results = this.state.leagueHistory
            .filter(match => match.round === round)
            .map(match => {
                const homeTeam = match.homeTeam.name;
                const awayTeam = match.awayTeam.name;
                const goalsData = match.goals || [];
                let homeGoals = 0;
                let awayGoals = 0;

                goalsData.forEach(goal => {
                    if (goal.home) {
                        homeGoals++;
                    } else {
                        awayGoals++;
                    }
                });

                return (
                    <div key={match.id} className="match-item">
                        <div className="match-header">
                            <span className="home-team">{homeTeam}</span>
                            <span className="away-team">{awayTeam}</span>
                        </div>
                        <div className="score">{homeGoals} – {awayGoals}</div>
                    </div>
                );
            });

        return <div>{results}</div>;
    }


    clearPlayers=()=>{
        this.setState({players: []});
    }



    render() {
        return (
            <div className="container">
            <div  className="section">
                <LeagueTable
                    leagues={this.state.leagues}//עובד
                chosenLeague={this.state.chosenLeague}
                onLeagueSelect={this.getTeamsByLeague}
                setChosenLeague={this.setChosenLeague}
                topScorers={this.state.topScorers}
                    clearPlayers={this.clearPlayers}
                    players={this.state.players}
            />
                </div>
                <div className="section">
            <TeamsTable teams={this.state.teams} chosenLeague={this.state.chosenLeague}
                        getTeamPlayers={this.getTeamPlayers}
                        players={this.state.players}
                        setSelectedTeam={this.setSelectedTeam}
                        teamHistory={this.getHistory}
                        getGoalsFormat={this.getGoalsFormat}
            />
                </div>

                {this.state.selectedTeam!=null&&(
                    <div className="section">
                    <TeamStats earliestAndLastGoal={this.earliestAndLastGoal}
                               roundsWithMostAndLastGoals={this.roundsWithMostAndLastGoals}
                               firstAndSecondRoundGoals={this.firstAndSecondRoundGoals}
                               players={this.state.players}

                />
                        </div>
                        )}
                {this.state.chosenLeague!=null&&(
                    <div className="section">
                    <LeagueHistory
                    leagueHistory={this.state.leagueHistory}
                    getMinLeagueCycle={this.getMinLeagueCycle}
                    getMaxLeagueCycle={this.getMaxLeagueCycle}
                    chosenLeague={this.state.chosenLeague}
                    getLeagueGamesByRound={this.getLeagueGamesByRound}
                    players={this.state.players}
                />
                    </div>
                )}
        </div>
    );

    }

}

export default App;
