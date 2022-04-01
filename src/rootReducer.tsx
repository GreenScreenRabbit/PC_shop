import { combineReducers } from "redux";
import { ActionsTypes } from "./actions and const/actions";
import { SET_CATALOG_HEIGHT_BODY } from "./actions and const/const";
// import { actions, ActionsTypes } from "./actions and const/actions";
// import {
//     COUNT_YEAR,
//     SET_INITIAL_AMOUNT,
//     SET_INTEREST_ACCRUALS,
//     SET_PERIODICITY,
//     SET_REPLENISHMENT,
// } from "./actions and const/const";

type InitialStateType = {
    countYear: string;

    initialAmount: string;
    replenishment: string;
    periodicity: string;
    interestAccruals: string;
};

const initialState: InitialStateType = {
    countYear: "",
    initialAmount: "",
    replenishment: "",
    periodicity: "EVERY YEAR",
    interestAccruals: "",
};

// const stateReducer = (state = initialState, action: ActionsTypes) => {
const stateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "COUNT_YEAR": {
            return { ...state, countYear: action.height };
        }


        default:
            return state;
    }
};


type initialMainPageType = {
    catalogHeightBody:number
    equipments: any[]
}


const initialMainPage: initialMainPageType = {
    catalogHeightBody: 700,
    equipments: []
};


const mainPageReducer = (state = initialMainPage, action: ActionsTypes) => {
    switch (action.type) {

        // case "SET_INTEREST_ACCRUALS": {
        //     return { ...state, interestAccruals: action.interestAccruals };
        // }



        case SET_CATALOG_HEIGHT_BODY: {
            return {...state, catalogHeightBody: action.height };
        }

        default:
            return state;
    }
};









export const rootReducer = combineReducers({
    generalState: stateReducer,
    mainPageState: mainPageReducer,
});
