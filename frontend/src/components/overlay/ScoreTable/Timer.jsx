import React from 'react';


function Timer({timer}) {
    // const {
    //     seconds,
    //     minutes,
    //     hours,
    //     days,
    //     isRunning,
    //     start,
    //     pause,
    //     reset,
    //   } = useStopwatch({ autoStart: false });


  return (
    <div className='timer'>
      {/*<span>0</span>:<span>0</span>*/}
        {/* eslint-disable-next-line react/prop-types */}
        <span>{timer.slice(0, 2)}</span>:<span>{timer.slice(2, 4)}</span>
      {/* <span>{minutes}</span>:<span>{seconds}</span> */}
    {/* <button onClick={start}>Start</button>
    <button onClick={pause}>Pause</button>
    <button onClick={reset}>Reset</button> */}
    </div>
  );
}

export default Timer













