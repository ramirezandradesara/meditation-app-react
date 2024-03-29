import { createContext, useReducer } from "react";

const Context = createContext()

/**
 * 
 * @param {*} props 
 * @returns 
 */
const Provider = (props) => {

    const initialState = {
        minutes: 0,
        seconds: 0,
        isPlaying: false,
        percentage: 0.1,
        timeData: null,
        music: null,
        video: null
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'PLAYSEC':
                return {
                    ...state,
                    seconds: state.seconds <= 59 ? state.seconds - 1 : 0,
                    percentage: state.percentage + state.timeData
                };
            case "SET_TIMER":
                return {
                    ...state,
                    minutes: action.payload,
                    timeData: 100 / (action.payload * 60)
                };
            case "START":
                return {
                    ...state,
                    minutes: state.minutes - 1,
                    seconds: 59,
                    isPlaying: true,
                };
            case "SET_MUSIC":
                return {
                    ...state,
                    music: action.payload,
                    video: action.video
                };
            case "RESET_SECONDS":
                return {
                    ...state,
                    seconds: 59,
                    minutes: state.minutes - 1,
                };
            case "STOP":
                return {
                    minutes: 0,
                    seconds: 0,
                    timeData: null,
                    isPlaying: false,
                    percentage: 0.1,
                    music: null,
                    video: null
                };

            default:
                throw new Error(`Unknown action type ${action.type}`);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider
            value={{
                state,
                dispatch
            }}>
            {props.children}
        </Context.Provider>
    )
};

export { Provider, Context }