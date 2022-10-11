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
        isPlaying: false
    };

    /**
     * 
     * @param {{ payload, type }} action 
     * @returns 
     */

    const reducer = (state, action) => {
        switch (action.type) {
            case 'PLAYSEC':
                return {
                    ...state,
                    seconds: state.seconds <= 59  ? state.seconds - 1 : 0,
                };
            case 'PLAYMIN':
                return {
                    ...state,
                    minutes: state.minutes <= 59 ? state.minutes - 1 : 0,
                };
            case "SET_TIMER":
                return {
                    ...state,
                    minutes: action.payload
                };
            case "START":
                return {
                    ...state,
                    minutes: state.minutes - 1,
                    seconds: 59,
                    isPlaying: true
                };
            case "STOP":
                return {
                    minutes: 0,
                    seconds: 0,
                    isPlaying: false
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
            }}
        >
            {props.children}
        </Context.Provider>
    )
};

export { Provider, Context }