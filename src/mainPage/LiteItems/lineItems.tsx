import { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { actions } from "../../actions and const/actions";
import { EquipmentsType } from "../../equipmentType/equipmentType";
import "./lineItems.css";

type PropsType = {
    setCatalogHeightBody: (height: number) => void;
    equipments: EquipmentsType | undefined;
    setEquipmentTypeForSort: (EquiType: string) => void;
    setIsCatalogBodyOpen: (bol: boolean) => void;
    isCatalogBodyOpen: boolean;
};

const LineItems = (props: PropsType) => {
    const equipmentsNameKey: string[] = ["all"];

    const [clickedNameButton, setClickedNameButton] = useState("");


    const changeButton = (nameClicked: string) => {
        if(clickedNameButton === ""){
            props.setIsCatalogBodyOpen(true);

        }
        if (clickedNameButton == nameClicked) {
            props.setIsCatalogBodyOpen(false);
        }else{
            props.setIsCatalogBodyOpen(true);
        }
        if (clickedNameButton == nameClicked && props.isCatalogBodyOpen  === false) {
            props.setIsCatalogBodyOpen(true);
        }
    };

    const createEquipmentsNameKey = () => {
        if (props.equipments) {
            for (const key in props.equipments) {
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
                                    setClickedNameButton(item);
                                    changeButton(item)
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
    isCatalogBodyOpen: state.mainPageState.isCatalogBodyOpen,
});

export default connect(mapStateToProps, {
    setCatalogHeightBody: actions.setCatalogHeightBody,
    setIsCatalogBodyOpen: actions.setIsCatalogBodyOpen,
    setEquipmentTypeForSort: actions.setEquipmentTypeForSort,
})(LineItems);
