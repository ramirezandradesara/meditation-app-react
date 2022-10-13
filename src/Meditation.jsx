import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import './Meditation.scss'
import { Context } from './reducer/Reducer'
import { BsFillCloudRainFill, BsSunFill } from 'react-icons/bs'
import { FaMountain } from 'react-icons/fa'
import soundRain from "./sounds/rain.mp3";
import soundBeach from "./sounds/beach.mp3";
// import soundMountain from "./sounds/rain.mp3";
import swal from 'sweetalert';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect } from 'react'
import beachVideo from './videos/beach.mp4'
import rainVideo from './videos/rain.mp4'
import { useRef } from 'react'

/**
 * Componente con todas las funcionalidades
 * @returns {JSX.Element}
 * @todo seleccinar musica y tiempo por default
 * @todo estilos para el boton seleccionado
 * @todo reiniciar 
 */
function Meditation() {

    const { state, dispatch } = useContext(Context)

    const audioRain = new Audio(soundRain);
    const audioBeach = new Audio(soundBeach);
    // const audioMountain = new Audio(soundMountain);

    const [intervaloSec, setIntervaloSec] = useState()
    const [intervaloMin, setIntervaloMin] = useState()

    const video = useRef(null)

    /**
     * Función que se llama en el botón "start" para empezar la sesión de meditación. 
     * Si no se ha elegido un tiempo y/o música de fondo antes, aparecerá una alerta.
     * Una vez elegido, comienza a correr el reloj e inicia la música.
     */
    const runTime = () => {
        if (state.music === null || state.timeData === null) {
            return swal("You need to set a timer and a background music to start.", {
                buttons: [null, "Got it!"],
            });
        } else {
            state.music.loop = true;
            state.music.play();
            video.current.play()
            dispatch({ type: 'START' })

            setIntervaloSec(
                setInterval(() => {
                    dispatch({ type: 'PLAYSEC' })
                }, 1000)
            );

            setIntervaloMin(
                setInterval(() => {
                    dispatch({ type: 'PLAYMIN' })
                }, 60000)
            );
        };
    };


    /**
     * Función que se llama en el botón "stop" y también cuando se termina el tiempo
     */
    const stopRunTime = () => {
        dispatch({ type: 'STOP' })
        clearInterval(intervaloSec)
        clearInterval(intervaloMin)
        state.music.pause();
        video.current.pause()

        swal("You finish your meditation session! Come back whenever you need to relax.", {
            buttons: [null, "Thanks!"],
        });
    };

    useEffect(() => {

        if (state.seconds === -1 && state.isPlaying) {
            dispatch({ type: 'RESET_SECONDS' })
        };

        if (state.minutes === 0 && state.seconds === 0 && state.isPlaying) {
            stopRunTime()
        };


    }, [state.isPlaying, state.minutes, state.seconds])

    console.log(state.isPlaying);

    return (
        <div className='meditation'>
            <div class="vid-container">
                <video src={state.video === null ? rainVideo : state.video} loop muted ref={video} />
            </div>
            <h1>Time to relax</h1>
            <h4>Select time and background music to start meditating</h4>
            <div style={{ width: window.innerWidth <= 768 ? 230 : 210, height: window.innerWidth <= 768 ? 230 : 210, marginBottom: '10px' }}>
                <CircularProgressbar
                    styles={buildStyles({
                        textColor: '#fff',
                        pathColor: '#777492',
                        tailColor: 'rgba(255,255,255,.2)',
                        pathTransitionDuration: 1.2,
                    })}
                    value={state.percentage}
                    text={`${state.minutes < 10 ? '0' + state.minutes : state.minutes}:${state.seconds < 10 ? '0' + state.seconds : state.seconds}`}
                />
            </div>
            <div
                // className={state.isPlaying ? "btns-container-hidden" : "btns-container"}
                className="btns-container"
                style={{ display: state.isPlaying ? 'none' : 'flex' }}
            >
                <div className="time-btns">
                    <button
                        className="btn-time"
                        onClick={() => dispatch({ type: 'SET_TIMER', payload: 5, timeData: 0.33 })}
                        data-time="300"
                    >5'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => dispatch({ type: 'SET_TIMER', payload: 10, timeData: 0.1666666666666667 })}
                    >10'
                    </button>
                    <button
                        className="btn-time"
                        onClick={() => dispatch({ type: 'SET_TIMER', payload: 15, timeData: 0.1111111111111111 })}
                    >15'
                    </button>
                </div>
                <div className="sound-btns">
                    <button
                        className="btn-sound"
                        onClick={() => dispatch({ type: 'SET_MUSIC', payload: audioBeach, video: beachVideo })}
                    >
                        <BsSunFill />
                    </button>
                    <button
                        className="btn-sound"
                        onClick={() => dispatch({ type: 'SET_MUSIC', payload: audioRain, video: rainVideo })}
                    >
                        <BsFillCloudRainFill />
                    </button>
                    <button
                        className="btn-sound"
                    // onClick={() => dispatch({ type: 'SET_MUSIC', payload: audioMountain })}
                    ><FaMountain />
                    </button>
                </div>
            </div>
            <div className='control-time-btns'>
                {
                    !state.isPlaying
                        ? <button
                            className='start-btn'
                            onClick={() => runTime()}
                        >Start</button>
                        : <button
                            className='stop-btn'
                            onClick={() => stopRunTime()}
                        >Stop</button>
                }
            </div>
        </div>
    )
};

export default Meditation