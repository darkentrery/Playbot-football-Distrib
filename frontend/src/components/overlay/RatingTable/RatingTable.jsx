import React, { useEffect, useRef, useState } from 'react'


function RatingTable({event}) {
  const [closed, setClosed] = useState(true)
  const tableRowsRef = useRef([]);
  const rulerRef = useRef([]);

  //Тут мы забираем элементы которые будут перемещены
  useEffect(() => {
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
    sortTable()
    setTimeout(() => {
      // setClosed(true);
    }, 3000);
    
  }, []);

  //Тут происходит сортировка
  const sortTable = () => {
    setTimeout(() => {
      tableRowsRef.current.sort((a, b) => {
        const aPoints = Number(a.querySelector(".points-col").textContent);
        const bPoints = Number(b.querySelector(".points-col").textContent);
        return bPoints < aPoints ? -1 : 1;
      });
      requestAnimationFrame(move);

    }, 1000);
  };
  
    // Движение
  const move = () => {
    tableRowsRef.current.forEach((row, i) => {
      row.style.transform = `translateY(${rulerRef.current[i] - row.dataset.originalTop}px)`;
    });
  };


  return (
    <>
    {/* Кнопка для теста откртия и таблицы */}
      {/* <button id="moveRowBtn" onClick={sortTable}>
        Sort Table
      </button> */}
      <div className="rating-table" style={{ opacity: closed ? '0' : '1' }}>
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
                  <div className="rating-row-team-color" style={{backgroundColor: team.color.color_hex}}></div>
                </div>
                <p>{team.do_goals}</p>
                <p className="points-col">{team.scores_forecast}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingTable