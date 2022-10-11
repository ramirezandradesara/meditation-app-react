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
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

/**
 * Componente con todas las funcionalidades
 * @returns {JSX.Element}
 * @todo que el circulo muestre el tiempo
 */
function Meditation() {

    const { state, dispatch } = useContext(Context)

    const [intervaloSec, setIntervaloSec] = useState()
    const [intervaloMin, setIntervaloMin] = useState()
    const [selectSong, setSelectSong] = useState(null)
    const [selectTime, setSelectTime] = useState(null)
    const [percentage, setPercentage] = useState(1)
    const [number, setNumber] = useState(1)

    /**
     * Función que se llama en el botón "start" para empezar la sesión de meditación. Si no se ha elegido un tiempo o música de fondo antes, aparecerá una alerta.
     * Una vez elegido, se inicia el reloj llamando a las actions pertinentes del Reducer y se inicia la música.
     */
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

    
    /**
     * Función que se llama en el botón "stop" así como cuando se termina el tiempo
     */
    const stopRunTime = () => {
        clearInterval(intervaloSec)
        clearInterval(intervaloMin)
        dispatch({ type: 'STOP' })
        selectSong.pause();
    };


    if (state.seconds === -1 && state.isPlaying) {
        state.seconds = 59
    };

    if (state.minutes === 0 && state.seconds === 0 && state.isPlaying) {
        stopRunTime()
    };

    if (state.isPlaying) {
        setInterval(() => {
            setNumber(number + 1)
            setPercentage((number * selectTime) / 100)
        }, 1000)
    };

    const audioRain = new Audio(soundRain);
    const audioBeach = new Audio(soundBeach);
    // const audioMountain = new Audio(ringer);

    return (
        <div className='meditation'>
            <h1>Time to relax</h1>
            <div style={{ width: 200, height: 200, marginBottom: '40px' }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${state.minutes < 10 ? '0' + state.minutes : state.minutes}:${state.seconds < 10 ? '0' + state.seconds : state.seconds}`}
                />;
            </div>
            <div className="btns-container">
                <div className="time-btns">
                    <button
                        className="btn-time"
                        onClick={() => { dispatch({ type: 'SET_TIMER', payload: 5 }); setSelectTime(300) }}
                        data-time="300"
                    >5'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => { dispatch({ type: 'SET_TIMER', payload: 10 }); setSelectTime(600) }}
                        data-time="600"
                    >10'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => { dispatch({ type: 'SET_TIMER', payload: 15 }); setSelectTime(900) }}
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
                    ><FaMountain />
                    </button>
                </div>
                <div className='control-time-btns'>
                    {
                        !state.isPlaying ?
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
                </div>
            </div>
        </div>
    )
}

export default Meditation