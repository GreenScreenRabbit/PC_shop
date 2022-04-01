import { SET_CATALOG_HEIGHT_BODY } from "./const";

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

export const actions = {
    setCatalogHeightBody: (height: number) => ({ type:SET_CATALOG_HEIGHT_BODY, height } as const),
};

export type ActionsTypes = GetActionsTypes<typeof actions>;