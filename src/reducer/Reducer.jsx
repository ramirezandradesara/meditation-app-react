import { createContext, useReducer } from "react";


const Context = createContext()


const Provider = (props) => {

    const initialState = {
        minutes: '00',
        seconds: '00'
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "DECREMENT":
                return 0;
            case "PAUSE":
                return 0;
            case "STOP":
                return 0;
            default:
                throw new Error(`Unknown action type ${action.type}`);
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider
            values={{
                state,
                dispatch
            }}
        >
            {props.children}
        </Context.Provider>
    )

}

export { Provider, Context }