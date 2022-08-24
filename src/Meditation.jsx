import React from 'react'
import { useContext } from 'react'
import './Meditation.css'
import { Context } from './reducer/Reducer'

function Meditation() {
    
    // const {state, dispatch} = useContext(Context)


    function displayedTime() {
        let seconds = document.querySelector('.seconds')
        let minutes = document.querySelector('.minutes')
        let pause = document.querySelector('.pause')

        let sec = "00";
        let min = "00";

        setInterval(function () {
            if (sec < 9) {
                sec = "0" + (parseInt(sec) + 1);
                seconds.innerHTML = sec;
                console.log(sec);
            }
            if (sec >= 9) {
                sec = parseInt(sec) + 1;
                seconds.innerHTML = sec;
                console.log(sec);
            }
            if (sec === 59) {
                sec = "00";
                seconds.innerHTML = sec;
                console.log(sec);
            }
        }, 1000)

        setInterval(function () {
            if (min < 9) {
                min = "0" + (parseInt(min) + 1);
                minutes.innerHTML = min;
                console.log(min);
            } else {
                min = "00";
                minutes.innerHTML = min;
                console.log(min);
            }
        }, 60000)

        pause.onClick = function () {
            clearInterval()
            console.log("hola!");
        }

    }



    return (
  
            <div className='meditation'>
                <h1>Time to relax</h1>
                <div className="time-btns">
                    <button
                        className="btn-time"
                        onClick={displayedTime}
                        data-time="300"
                    >5 min
                    </button>
                    <button
                        className="btn-time"
                        onClick={displayedTime}
                        data-time="600"
                    >10 min
                    </button>
                    <button
                        className="btn-time"
                        onClick={displayedTime}
                        data-time="900"
                    >15 min
                    </button>
                </div>

                <div className="time-display">
                    <span className='minutes'>00</span>
                    <span>:</span>
                    <span className='seconds'>00</span>
                </div>

                <div className='control-time-btns'>
                    <button
                        className='start-btn'
                    >Start</button>
                    <button
                        className='pause-btn'
                    >Pause</button>
                    <button
                        className='stop-btn'
                    >Stop</button>
                </div>
                <div className="sound-btns">
                    <button className="btn-sound">Rain</button>
                    <button className="btn-sound">Beach</button>
                    <button className="btn-sound">Mountain</button>
                    <button className="btn-sound">No Sound</button>
                </div>

            </div>

    )
}

export default Meditation