import React, { useState, useEffect } from 'react';

function Stopwatch(props) {
  const [time, setTime] = useState(0);
  
  useEffect(() => {

    let timer;

    if (props.timer) {
      setTime(0)
      timer = setInterval(() => {
       
        setTime(prevTime => prevTime + 1);
      }, 1000);
     } //else {
    //   setTime(0);
    // }

    return () => clearInterval(timer);


    
  }, [props.timer]);





  const formatTime = (timeInSeconds) => {
    const seconds = timeInSeconds % 60;
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <p>{formatTime(time)}</p>

    </div>
  );
}

export default Stopwatch;