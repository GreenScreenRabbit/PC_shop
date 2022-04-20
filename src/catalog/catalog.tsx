import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from "../actions and const/actions";
import { EquipmentsType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "../equipmentType/equipmentType";
import "./catalog.css";

type PropsType = {
    catalogHeightBody: number;
    equipments: EquipmentsType;
    equipmentTypeForSort: string;
    setSelectedEquipment: (item: OneOfEquipmentType) => void;
    isCatalogBodyOpen: boolean;
};

const Catalog = (props: PropsType) => {
    const sortedEquiName: OneOfEquipmentsArrayType[] = [];

    const [render, setRender] = useState(false);

    const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);

    const equipmentTypeSort = () => {
        Object.entries(props.equipments).find(([key, value]) => {
            if (props.equipmentTypeForSort === "all") {
                sortedEquiName.push(value);
                return;
            }
            if (key == props.equipmentTypeForSort) {
                sortedEquiName.push(value);
            }
        });
    };

    if (props.equipments) {
        equipmentTypeSort();
    }

    return (
        <>
            <div className="catalog-body" style={{ height: props.isCatalogBodyOpen ? "700px" : "0px" }}>
                <Row style={{ height: "100%" }}>
                    <Col md={2}>
                        <div className="catalog-filter">
                            <div></div>
                        </div>
                    </Col>
                    <Col md={10}>
                        {sortedEquiName.map((equipmentsArray) => {
                            return equipmentsArray.map((item) => {
                                return (
                                    <Link to="/productPage">
                                        <div
                                            className="catalog-item"
                                            onClick={() => {
                                                props.setSelectedEquipment(item);
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    </Link>
                                );
                            });
                        })}

                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    catalogHeightBody: state.mainPageState.catalogHeightBody,
    equipments: state.mainPageState.equipments,
    equipmentTypeForSort: state.mainPageState.equipmentTypeForSort,
    isCatalogBodyOpen: state.mainPageState.isCatalogBodyOpen,
});

export default connect(mapStateToProps, {
    setSelectedEquipment: actions.setSelectedEquipment,
})(Catalog);
