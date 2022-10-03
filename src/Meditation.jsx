import React, { useReducer } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import './Meditation.scss'
import { Context } from './reducer/Reducer'
import rainSound from './sounds/rain.mp3'
import { BsFillCloudRainFill, BsSunFill } from 'react-icons/bs'
import { FaMountain } from 'react-icons/fa'
import soundRain from "./sounds/rain.mp3";
import soundBeach from "./sounds/beach.mp3";
// import soundMountain from "./sounds/rain.mp3";

/**
 * Componente con todas las funcionalidades
 * @returns {JSX.Element}
 * @todo pausar 
 * @todo al terminar tiempo, que se detenga
 * @todo alerta cuando se empiece sin seleccionar sonido o tiempo
 * @todo que el boton de start desaparezca cuando se inicie el tiempo
 */
function Meditation() {

    const { state, dispatch } = useContext(Context)

    const [intervaloSec, setIntervaloSec] = useState()
    const [intervaloMin, setIntervaloMin] = useState()
    const [startPlaying, setStartPlaying] = useState(false)
    const [selectSong, setSelectSong] = useState(null)

    //PLAY FOR SECONDS AND MINUTES
    const runTime = () => {
        selectSong.loop = true;
        selectSong.play();

        dispatch({ type: 'START' })
        setStartPlaying(true)

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
    const clearRunTime = () => {
        clearInterval(intervaloSec)
        clearInterval(intervaloMin)
    };

    //STOP 
    const stopRunTime = () => {
        clearInterval(intervaloSec)
        clearInterval(intervaloMin)
        dispatch({ type: 'STOP' })
        selectSong.pause();
    };

    if (state.seconds === -1 && startPlaying) {
        state.seconds = 59
    }

    const audioRain = new Audio(soundRain);
    const audioBeach = new Audio(soundBeach);
    // const audioMountain = new Audio(ringer);

    return (
        <div className='meditation'>
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
                        onClick={() => dispatch({ type: 'SET_TIMER', payload: 5 })}
                        data-time="300"
                    >5'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => dispatch({ type: 'SET_TIMER', payload: 10 })}
                        data-time="600"
                    >10'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => dispatch({ type: 'SET_TIMER', payload: 15 })}
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
                    <button
                        className='start-btn'
                        onClick={() => { runTime() }}
                    >Start</button>
                    <button
                        className='pause-btn'
                        onClick={() => clearRunTime()}
                    >Pause</button>
                    <button
                        className='stop-btn'
                        onClick={() => stopRunTime()}
                    >Stop</button>
                </div>

            </div>
        </div>

    )
}

export default Meditation