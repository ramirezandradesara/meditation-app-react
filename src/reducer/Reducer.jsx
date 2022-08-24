import { createContext, useReducer } from "react";


const Context = createContext()


/**
 * 
 * @param {*} props 
 * @returns 
 * @TODO el cronómetro sea de dos números: 00:09
 */
const Provider = (props) => {

    const initialState = {
        minutes: 0,
        seconds: 0
    }

    /**
     * 
     * @param {*} state 
     * @param {{
     * payload,
     * type
     * }} action 
     * @returns 
     */

    const reducer = (state, action) => {
        switch (action.type) {
            case 'PLAYSEC':
                return {
                    ...state,
                    seconds: state.seconds < 59 ? state.seconds + 1 : 0
                };
            case 'PLAYMIN':
                return {
                    ...state,
                    minutes: state.minutes < 59 ? state.minutes + 1 : 0
                };
            case "STOP":
                return {
                    minutes: 0,
                    seconds: 0
                };
            default:
                throw new Error(`Unknown action type ${action.type}`);
        }
    };


    /* Lógica que se encuentra en el reducer y en meditation.jsx ^_____^
    
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
     }*/


    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider
            value={{
                state,
                dispatch
            }}
        >
            {props.children}
        </Context.Provider>
    )
};

export { Provider, Context }