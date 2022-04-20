import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from "../../actions and const/actions";
import { EquipmentsType, OneOfEquipmentType } from "../../equipmentType/equipmentType";
import "./mainSection.css";

type keys = keyof EquipmentsType;

type ItemsType = EquipmentsType[keys];

type PropsType = {
    items: ItemsType | undefined;
    setSelectedEquipment: (equipment: OneOfEquipmentType) => void;
};

const MainSection = (props: PropsType) => {
    const [selectedIndexBox, setSelectedIndexBox] = useState<number>();

    return (
        <>
            <div className="mainSection-body">
                <div className="mainSection-header"></div>
                {props.items ? (
                    props.items.map((item, index) => {
                        return (
                            <Link to="/productPage">
                                <div
                                    className="mainSection-box"
                                    onClick={() => {
                                        props.setSelectedEquipment(item);
                                    }}
                                >
                                    <div
                                        className="mainSection-box-itemsCon"
                                        onMouseMove={() => setSelectedIndexBox(index)}
                                        style={{ zIndex: selectedIndexBox == index ? 2 : 1 }}
                                    >
                                        <div className="mainSection-box-imgCon">
                                            <img className="mainSection-box-imgCon-img" src={item.imgs[0]} />
                                        </div>
                                        <div className="mainSection-box-name">{item.name}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div>Nde</div>
                )}
            </div>
        </>
    );
};

export default connect(null, { setSelectedEquipment: actions.setSelectedEquipment })(MainSection);
