// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState, useMemo } from 'react'

// eslint-disable-next-line react/prop-types,no-unused-vars
function RatingTable({ event, game }) {

  // const [currentPos,setCurrentPos]=useState(0);
  const [closed, setClosed] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const tableRowsRef = useRef([]);
  const rulerRef = useRef([]);

  //Тут мы забираем элементы которые будут перемещены
  useEffect(() => {
    if (event.is_begin) {
      console.log("updating")
      const tableRows = Array.from(document.querySelectorAll('.rating-table-right .rating-row'));
      tableRowsRef.current = tableRows;

      const ruler = tableRows.map(row => {
        const rect = row.getBoundingClientRect();
        row.dataset.originalTop = rect.top;
        return rect.top;
      });
      rulerRef.current = ruler;

      move();
      setClosed(false);
      sortTable();
      setTimeout(() => {
        setClosed(true);
      }, 3000);
      console.log(event)
    }
  }, [event.is_begin]);

  const updateTable = () => {
    sortTable();
  }

  //Тут происходит сортировка
  const sortTable = () => {
    const originalRows = [...tableRowsRef.current]; // Make a copy of the original array
    tableRowsRef.current.sort((a, b) => {
      const aPoints = Number(a.querySelector(".points-col").textContent);
      const bPoints = Number(b.querySelector(".points-col").textContent);
      const aGoals = Number(a.querySelector(".goals-col").textContent);
      const bGoals = Number(b.querySelector(".goals-col").textContent);
      const aGames = Number(a.querySelector(".games-col").textContent);
      const bGames = Number(b.querySelector(".games-col").textContent);

      if (bPoints !== aPoints) {
        return bPoints - aPoints; //sort by points (primary)
      } else if (bGoals - aGoals !== 0) {
        return bGoals - aGoals; //sort by goal difference (secondary)
      } else {
        return bGames - aGames; //sort by number of games (tertiary)
      }
    });

    //check ifthe order of objects in the array has changed
    const orderChanged = !originalRows.every((row, index) => row === tableRowsRef.current[index]);

    if (orderChanged) {
      setClosed(false);
      setTimeout(() => {
        requestAnimationFrame(move);
        setTimeout(() => {
          setClosed(true);
        }, 5000);
      }, 1000)
    }

  };

  // Движение
  const move = () => {
    console.log("start moving")
    tableRowsRef.current.forEach((row, i) => {
      row.style.transform = `translateY(${rulerRef.current[i] - row.dataset.originalTop}px)`;
    });
  };

  const memoizedGoalsLength = useMemo(() => game, [game.goals.length]);

  useEffect(() => {
    if (event && setClosed && !isFirstLoad) {
      setTimeout(() => {
        sortTable();
      }, 5000)
    }
  }, [memoizedGoalsLength])

  useEffect(() => {
    setIsFirstLoad(false)
  }, [])
  return (
    <>
      <div className="rating-table" style={{ opacity: closed ? '0' : '1' }} onClick={updateTable}>
        <div className="rating-table-top">
          <div className="rating-table-top-left">
            <p>No.</p>
          </div>
          <div className="rating-table-top-right">
            <p>NAME</p>
            <p className="games">G</p>
            <p className="points">P</p>
          </div>
        </div>
        <div className="rating-table-center">
          <div className="rating-table-left">

            {!!event && event.teams.map((team, key) => (<p key={key}>{key + 1}</p>))}
          </div>
          <div className="rating-table-right">

            {!!event && event.teams.map((team, key) => (
              <div className="rating-row" key={key}>
                <div className="rating-row-team">
                  <p>{team.name}</p>
                  <div className="rating-row-team-color" style={{ backgroundColor: team.color.color_hex }}></div>
                </div>
                <p className='goals-col'>{team.do_goals}</p>
                <p className='points-col'>{team.scores}</p>
                <p className='games-col' style={{ display: "none" }}>{team.played}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingTable;