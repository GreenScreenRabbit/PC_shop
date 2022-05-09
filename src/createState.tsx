import { applyMiddleware, compose, createStore } from "redux";
//import { rootReducer } from "./rootReducer"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

function logger({ getState }: any) {
    return (next: (arg0: any) => any) => (action: any) => {
        console.log("will dispatch", action);

        const returnValue = next(action);


        return returnValue;
    };
}

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
