import React, { useReducer } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import './Meditation.css'
import { Context } from './reducer/Reducer'
import rainSound from './sounds/rain.mp3'
import ringer from "./sounds/rain.mp3";
import { HiSun } from 'react-icons/hi';
import { BsFillCloudRainFill, BsSunFill } from 'react-icons/bs'
import { FaMountain } from 'react-icons/fa'

/**
 * Componente con todas las funcionalidades
 * @returns {JSX.Element}
 */
function Meditation() {

    const {
        state,
        dispatch
    }
        = useContext(Context)

    const minutes = useRef()
    const seconds = useRef()


    // function ref() {
    //     minutes.current.innerHTML = '00'
    // }

    const [intervaloSec, setIntervaloSec] = useState()
    const [intervaloMin, setIntervaloMin] = useState()

    //PLAY FOR SECONDS AND MINUTES
    const runTime = () => {
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
    }
    //STOP 
    const stopRunTime = () => {
        clearInterval(intervaloSec)
        clearInterval(intervaloMin)
        dispatch({ type: 'STOP' })
    }


    const rain = useRef()
    const buttonRain = useRef()

    // function playSound() {
    //     const sound = rain.current.getAttribute('src')
    //     // sound.play()

    //     const soundButton = buttonRain.current.getAttribute('datasound')
    //     soundButton.play()
    //     console.log(soundButton);

    // }

    function playSound() {
        // console.log(rain.current.getAttribute('dataSound'));
        const sound = rain.current.getAttribute('src')
        sound.play()
        // console.log(rain.current.getAttribute('src'));
        rain.current.getAttribute('src').play()
        new Audio('./sounds/rain.mp3').play()
    }

    useEffect(() => {
        // playSound()
    }, [])

    const audio = new Audio(ringer);
    audio.loop = true;


    return (

        <div className='meditation'>
            <h1>Time to relax</h1>

            <div className="time-display">
                <span className='minutes' ref={minutes}>{state.minutes}</span>
                <span>:</span>
                <span className='seconds' ref={seconds}>{state.seconds}</span>
            </div>
            
            <div className="btns-container">

                <div className="time-btns">
                    <button
                        className="btn-time"
                        // onClick={() => dispatch({ type: 'DECREMENT' })}
                        data-time="300"
                    >5'
                    </button>
                    <button
                        className="btn-time"
                        data-time="600"
                    >10'
                    </button>
                    <button
                        className="btn-time"
                        data-time="900"
                    >15'
                    </button>
                </div>

                <div className="sound-btns">
                    <button
                        className="btn-sound"
                        datasound="src\sounds\rain.mp3"
                        data-video="./video/rain.mp4"
                        ref={buttonRain}
                        onClick={() => playSound()}>
                        <BsSunFill />
                    </button>

                    {/* <button
                    onClick={() => {
                        audio.loop = true;
                        audio.play();
                    }}
                    >
                    asdasd
                </button> */}

                    <button className="btn-sound">
                        <BsFillCloudRainFill />
                    </button>

                    {/* <audio
                    class="song"
                    src="./sounds/rain.mp3"
                    ref={rain}
                    controls>
                </audio> */}

                    <button className="btn-sound">
                        <FaMountain />
                    </button>
                </div>

                <div className='control-time-btns'>
                    <button
                        className='start-btn'
                        onClick={() => runTime()}
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