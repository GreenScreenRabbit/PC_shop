export type EquipmentsType = {
    videoCards: any[];
    processors: any[];
    ssd: any[];
    motherboard: any[];
    RAMs: any[];
};

type GeneralEquipmentType = {
    name: string;
    typeItem: string;
    price: string;
    company: string;
    imgs:string[];
};



type VideoCardType = GeneralEquipmentType & {
    memory : string
}
