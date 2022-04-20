import { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { actions } from "../../actions and const/actions";
import { EquipmentsType } from "../../equipmentType/equipmentType";
import "./lineItems.css";

type PropsType = {
    setCatalogHeightBody: (height: number) => void;
    equipments: EquipmentsType | undefined;
    setEquipmentTypeForSort: (EquiType: string) => void;
    setIsCatalogBodyOpen: (bol:boolean) => void
};

const LineItems = (props: PropsType) => {
    const equipmentsNameKey: string[] = ["all"];

    const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);

    if (isOpenCatalog) {
        props.setIsCatalogBodyOpen(true)
        props.setCatalogHeightBody(700);
    } else {
        props.setIsCatalogBodyOpen(false)
        props.setCatalogHeightBody(0);
    }

    // const [equipmentsNameKey, setEquipmentsNameKey] = useState<string[]>(["all"])

    // useEffect(() => {
    //     console.log("EFECT");

    //     createEquipmentsNameKey()
    // },[props.equipments])

    const createEquipmentsNameKey = () => {
        if (props.equipments) {
            for (const key in props.equipments) {
                console.log(`props.equipments = ${props.equipments}`);
                console.log(`key = ${key}`);
                equipmentsNameKey.push(key);
            }
        }
    };

    if (props.equipments != undefined) {
        createEquipmentsNameKey();
    }

    return (
        <>
            <div className="lineItems">
                <div className="lineItems-itemsCon">
                    {equipmentsNameKey.map((item) => {
                        return (
                            <div
                                className="lineItems-item"
                                onClick={() => {
                                    setIsOpenCatalog(!isOpenCatalog);
                                    props.setEquipmentTypeForSort(item);
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    equipments: state.mainPageState.equipments,
});

export default connect(mapStateToProps, {
    setCatalogHeightBody: actions.setCatalogHeightBody,
    setIsCatalogBodyOpen: actions.setIsCatalogBodyOpen,
    setEquipmentTypeForSort: actions.setEquipmentTypeForSort,
})(LineItems);
