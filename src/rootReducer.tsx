import { combineReducers } from "redux";
import { ActionsTypes } from "./actions and const/actions";
import {
    DELETE_EQUIPMENT_FROM_BASKET_AT_INDEX,
    SET_BASKET_EQUIMENT,
    SET_CATALOG_HEIGHT_BODY,
    SET_EQUIPMENTS_FROM_SERVER,
    SET_EQUIPMENT_TYPE_FOR_SORT,
    SET_IS_CATALOG_BODY_OPEN,
    SET_SELECTED_EQUIPMENT,
} from "./actions and const/const";
import { EquipmentsType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "./equipmentType/equipmentType";

// type InitialStateType = {
//     countYear: string;
//     initialAmount: string;
//     replenishment: string;
//     periodicity: string;
//     interestAccruals: string;
// };

// const initialState: InitialStateType = {
//     countYear: "",
//     initialAmount: "",
//     replenishment: "",
//     periodicity: "EVERY YEAR",
//     interestAccruals: "",
// };

// const stateReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case "COUNT_YEAR": {
//             return { ...state, countYear: action.height };
//         }

//         default:
//             return state;
//     }
// };

type initialMainPageType = {
    catalogHeightBody: number;
    equipments: EquipmentsType | undefined;
    selectedEquipment: OneOfEquipmentType | null;
    isCatalogBodyOpen: boolean;
    basket: OneOfEquipmentType[];
};

const initialMainPage: initialMainPageType = {
    catalogHeightBody: 700,
    equipments: undefined,
    selectedEquipment: null,
    isCatalogBodyOpen: false,
    basket: [],
};

const mainPageReducer = (state = initialMainPage, action: ActionsTypes) => {
    switch (action.type) {
        case SET_CATALOG_HEIGHT_BODY: {
            return { ...state, catalogHeightBody: action.height };
        }

        case DELETE_EQUIPMENT_FROM_BASKET_AT_INDEX: {
            return { ...state, basket: [...state.basket.slice(0, action.index), ...state.basket.slice(action.index + 1)] };
        }

        case SET_EQUIPMENTS_FROM_SERVER: {
            return { ...state, equipments: action.equipments };
        }

        case SET_SELECTED_EQUIPMENT: {
            return { ...state, selectedEquipment: action.equipment };
        }

        case SET_EQUIPMENT_TYPE_FOR_SORT: {
            return { ...state, equipmentTypeForSort: action.equiNameSort };
        }

        case SET_IS_CATALOG_BODY_OPEN: {
            return { ...state, isCatalogBodyOpen: action.isOpen };
        }

        case SET_BASKET_EQUIMENT: {
            return { ...state, basket: [...state.basket, action.equipment] };
        }

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    // generalState: stateReducer,
    mainPageState: mainPageReducer,
});
