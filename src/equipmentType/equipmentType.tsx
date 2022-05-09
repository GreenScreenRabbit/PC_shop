export type EquipmentsType = {
    videoCards: VideoCardType[];
    processors: ProcessorType[];
    ssd: SSD_Type[];
    motherboard: MotherboardType[];
    RAMs: RAM_Type[];
};

type GeneralEquipmentType<T, Y> = {
    name: string;
    typeItem: Y;
    price: number;
    company: string;
    imgs: string[];
    characteristics: T[];
};

type CharacteristicsVideoCardType = {
    memory: string;
    memoryClockSpeed: string;
    GPU_ClockSpeed: string;
};

type CharacteristicsProcessorType = {
    CPU_Speed: string;
    socket: string;
    processorCount: string;
};

type CharacteristicsSSD_Type = {
    storage: string;
};

type CharacteristicsMotherboardType = {
    RAM_Technology: string;
    socket: string;
};

type CharacteristicsRAM_Type = {
    memorySize: string;
    RAM_Technology: string;
    memorySpeed: string;
};




export enum EnumNameType {
    processor = "processor",
    RAM = "RAM",
    SSD = "SSD",
    motherboard = "motherboard",
    videoCard = "videocard"
}





export type VideoCardType = GeneralEquipmentType<CharacteristicsVideoCardType,EnumNameType.videoCard>;
export type ProcessorType = GeneralEquipmentType<CharacteristicsProcessorType,EnumNameType.processor>;
export type SSD_Type = GeneralEquipmentType<CharacteristicsSSD_Type,EnumNameType.SSD>;
export type MotherboardType = GeneralEquipmentType<CharacteristicsMotherboardType, EnumNameType.motherboard>;
export type RAM_Type = GeneralEquipmentType<CharacteristicsRAM_Type,EnumNameType.RAM>;

type keys = keyof EquipmentsType;

export type OneOfEquipmentsArrayType = EquipmentsType[keys];
type K = keyof OneOfEquipmentsArrayType;

type KeyOneOfEqui = keyof OneOfEquipmentsArrayType[K]
export type OneOfEquipmentType = OneOfEquipmentsArrayType[KeyOneOfEqui]

export type E = Omit<keyof OneOfEquipmentsArrayType[K],keyof []>;


