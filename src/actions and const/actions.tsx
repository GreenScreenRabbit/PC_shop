import { EquipmentsType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "../equipmentType/equipmentType";
import {
    DELETE_EQUIPMENT_FROM_BASKET_AT_INDEX,
    SET_BASKET_EQUIMENT,
    SET_CATALOG_HEIGHT_BODY,
    SET_EQUIPMENTS_FROM_SERVER,
    SET_EQUIPMENT_TYPE_FOR_SORT,
    SET_IS_CATALOG_BODY_OPEN,
    SET_SELECTED_EQUIPMENT,
} from "./const";

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

export const actions = {
    setCatalogHeightBody: (height: number) => ({ type: SET_CATALOG_HEIGHT_BODY, height } as const),
    setEquipmentsFromServer: (equipments: EquipmentsType) =>
        ({ type: SET_EQUIPMENTS_FROM_SERVER, equipments } as const),
    setSelectedEquipment: (equipment: OneOfEquipmentType) => ({ type: SET_SELECTED_EQUIPMENT, equipment } as const),
    setEquipmentTypeForSort: (equiNameSort: string) => ({ type: SET_EQUIPMENT_TYPE_FOR_SORT, equiNameSort } as const),
    setIsCatalogBodyOpen: (isOpen: boolean) => ({ type: SET_IS_CATALOG_BODY_OPEN, isOpen } as const),
    setBasketEquipment: (equipment: OneOfEquipmentType) => ({ type: SET_BASKET_EQUIMENT, equipment } as const),
    deleteEquipmentFromBasketAtIndex: (index:number) => ({type:DELETE_EQUIPMENT_FROM_BASKET_AT_INDEX , index} as const),
};

export type ActionsTypes = GetActionsTypes<typeof actions>;
