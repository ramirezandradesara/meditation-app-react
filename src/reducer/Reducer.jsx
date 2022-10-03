import { createContext, useReducer } from "react";


const Context = createContext()


/**
 * 
 * @param {*} props 
 * @returns 
 * @TODO el cronómetro sea de dos números: 00:09
 * @TODO que cuando llegue a 5, 10 o 15 minutos termine
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
                    seconds: state.seconds <= 59  ? state.seconds - 1 : 0
                };

            case 'PLAYMIN':
                return {
                    ...state,
                    minutes: state.minutes <= 59 ? state.minutes - 1 : 0
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
                    seconds: 59
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