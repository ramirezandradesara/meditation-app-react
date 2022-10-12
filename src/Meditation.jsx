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
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect } from 'react'

/**
 * Componente con todas las funcionalidades
 * @returns {JSX.Element}
 * @todo add background video
 * @todo estilos para el boton seleccionado
 */
function Meditation() {

    const { state, dispatch } = useContext(Context)

    const audioRain = new Audio(soundRain);
    const audioBeach = new Audio(soundBeach);
    // const audioMountain = new Audio(soundMountain);

    const [intervaloSec, setIntervaloSec] = useState()
    const [intervaloMin, setIntervaloMin] = useState()

    /**
     * Función que se llama en el botón "start" para empezar la sesión de meditación. 
     * Si no se ha elegido un tiempo y/o música de fondo antes, aparecerá una alerta.
     * Una vez elegido, comienza a correr el reloj e inicia la música.
     */
    const runTime = () => {
        if (state.music === null || state.timeData === null) {
            return swal("Select time and background music to start meditating.", {
                buttons: [null, "Got it!"],
            });
        } else {
            state.music.loop = true;
            state.music.play();

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
    };
    
    useEffect(() => {
        if (state.seconds === -1 && state.isPlaying) {
            dispatch({ type: 'RESET_SECONDS' })
        };

        if (state.minutes === 0 && state.seconds === 0 && state.isPlaying) {
            stopRunTime()
        };

    }, [state.isPlaying, state.minutes, state.seconds])


    return (
        <div className='meditation'>
            <h1>Time to relax</h1>
            <div style={{ width: 200, height: 200, marginBottom: '40px' }}>
                <CircularProgressbar
                    value={state.percentage}
                    text={`${state.minutes < 10 ? '0' + state.minutes : state.minutes}:${state.seconds < 10 ? '0' + state.seconds : state.seconds}`}
                />;
            </div>
            <div className="btns-container">
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
                        onClick={() => dispatch({ type: 'SET_MUSIC', payload: audioBeach })}
                    >
                        <BsSunFill />
                    </button>
                    <button
                        className="btn-sound"
                        onClick={() => dispatch({ type: 'SET_MUSIC', payload: audioRain })}
                    >
                        <BsFillCloudRainFill />
                    </button>
                    <button
                        className="btn-sound"
                    // onClick={() => dispatch({ type: 'SET_MUSIC', payload: audioMountain })}
                    ><FaMountain />
                    </button>
                </div>
                <div className='control-time-btns'>
                    {
                        !state.isPlaying
                            ? <button
                                className='start-btn'
                                onClick={() =>  runTime() }
                            >Start</button>
                            : <button
                                className='stop-btn'
                                onClick={() => stopRunTime()}
                            >Stop</button>
                    }
                </div>
            </div>
        </div>
    )
};

export default Meditation