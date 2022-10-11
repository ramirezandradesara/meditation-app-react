import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import './Meditation.scss'
import { Context } from './reducer/Reducer'
import { BsFillCloudRainFill, BsSunFill } from 'react-icons/bs'
import { FaMountain } from 'react-icons/fa'
import soundRain from "./sounds/rain.mp3";
import soundBeach from "./sounds/beach.mp3";
import swal from 'sweetalert';
// import soundMountain from "./sounds/rain.mp3";

/**
 * Componente con todas las funcionalidades
 * @returns {JSX.Element}
 * @todo alerta cuando se empiece sin seleccionar sonido o tiempo
 * @todo que el circulo muestre el tiempo
 */
function Meditation() {

    const { state, dispatch } = useContext(Context)

    const [intervaloSec, setIntervaloSec] = useState()
    const [intervaloMin, setIntervaloMin] = useState()
    const [selectSong, setSelectSong] = useState(null)
    const [selectTime, setSelectTime] = useState(null)
    


    //PLAY FOR SECONDS AND MINUTES
    const runTime = () => {
        if (selectSong === null || selectTime === null) {
            swal("Select time and background music to start meditating.", {
                buttons: [null, "Got it!"],
              });
        }

        selectSong.loop = true;
        selectSong.play();


        dispatch({ type: 'START' })

        setIntervaloSec(
            setInterval(() => {
                dispatch({ type: 'PLAYSEC' })
            }, 1000)
        )

        setIntervaloMin(
            setInterval(() => {
                dispatch({ type: 'PLAYMIN' })
            }, 60000)
        )
    };

    //PAUSE 
    // const clearRunTime = () => {
    //     clearInterval(intervaloSec)
    //     clearInterval(intervaloMin)
    //     selectSong.pause();
    // };

    //STOP 
    const stopRunTime = () => {
        clearInterval(intervaloSec)
        clearInterval(intervaloMin)
        dispatch({ type: 'STOP' })
        selectSong.pause();
    };

    if (state.seconds === -1 && state.isPlaying) {
        state.seconds = 59
    }

    if (state.minutes === 0 && state.seconds === 0 && state.isPlaying) {
        stopRunTime()
    }


    const audioRain = new Audio(soundRain);
    const audioBeach = new Audio(soundBeach);
    // const audioMountain = new Audio(ringer);

    return (
        <div className='meditation'>
            {/* <video loop>
                <source src="./video/rain.mp4" type="video/mp4"/>
            </video> */}
            <h1>Time to relax</h1>
            <div className="time-display">
                <span className='minutes'>{state.minutes < 10 ? '0' + state.minutes : state.minutes}</span>
                <span>:</span>
                <span className='seconds'>{state.seconds < 10 ? '0' + state.seconds : state.seconds}</span>
            </div>

            <div className="btns-container">
                <div className="time-btns">
                    <button
                        className="btn-time"
                        onClick={() => {dispatch({ type: 'SET_TIMER', payload: 5 }); setSelectTime(true)}}
                        data-time="300"
                    >5'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => {dispatch({ type: 'SET_TIMER', payload: 10 }); setSelectTime(true)}}
                        data-time="600"
                    >10'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => {dispatch({ type: 'SET_TIMER', payload: 15 }); setSelectTime(true)}}
                        data-time="900"
                    >15'
                    </button>
                </div>

                <div className="sound-btns">
                    <button
                        className="btn-sound"
                        onClick={() => setSelectSong(audioBeach)}>
                        <BsSunFill />
                    </button>
                    <button
                        className="btn-sound"
                        onClick={() => setSelectSong(audioRain)}>
                        <BsFillCloudRainFill />
                    </button>
                    <button
                        className="btn-sound"
                    // onClick={() => setSelectSong(audioMountain)}
                    >
                        <FaMountain />
                    </button>
                </div>
                <div className='control-time-btns'>
                    {!state.isPlaying ?

                        <button
                            className='start-btn'
                            onClick={() => { runTime() }}
                        >Start</button>
                        :
                        <button
                            className='stop-btn'
                            onClick={() => stopRunTime()}
                        >Stop</button>
                    }
                    {/* <button
                        className='pause-btn'
                        onClick={() => clearRunTime()}
                    >Pause</button> */}
                </div>
            </div>
        </div>

    )
}

export default Meditation