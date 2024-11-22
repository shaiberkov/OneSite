const GeneralStats = (props) => {
    return (
        <div>
            <h2>סטטיסטיקה כללית</h2>
            <p>גולים מחצית ראשונה: {props.stats.firstHalfGoals}</p>
            <p>גולים מחצית שנייה: {props.stats.secondHalfGoals}</p>
            <p>הגול המוקדם ביותר: {props.stats.earliestGoal}</p>
            <p>הגול המאוחר ביותר: {props.stats.latestGoal}</p>
            <p>המחזור עם הכי הרבה שערים: {props.stats.mostGoalsRound}</p>
            <p>המחזור עם הכי מעט שערים: {props.stats.leastGoalsRound}</p>
        </div>
    );
};
export default GeneralStats;