import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import "./catalog.css";

type PropsType = {
    catalogHeightBody: number;
};

const Catalog = (props: PropsType) => {
    return (
        <>
            <div className="catalog-body" style={{ height: props.catalogHeightBody.toString() + "px" }}>
                <Row style={{ height: "100%" }}>
                    <Col md={2}>
                        <div className="catalog-filter">
                        <div>D</div>
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className="catalog-item"></div>
                        <div className="catalog-item"></div>
                        <div className="catalog-item"></div>
                        <div className="catalog-item"></div>
                        <div className="catalog-item"></div>
                        <div className="catalog-item"></div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    catalogHeightBody: state.mainPageState.catalogHeightBody,
});

export default connect(mapStateToProps, {})(Catalog);
