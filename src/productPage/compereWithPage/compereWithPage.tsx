import React, { useRef, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import "./compereWithPage.css";

const ItemCompere = () => {
    return (
        <>
            <div className="item-body">
                <div className="item-imgContainer"></div>
            </div>
        </>
    );
};

const CompereWithPage = () => {
    const [isMouseOnItemsContainer, setIsMouseOnItemsContainer] = useState<boolean>(false);
    const [mouseAfterClickPos, setMouseAfterClickPos] = useState<string>("");
    const [mouseAfterClickPosUpMouse, setMouseAfterClickPosUpMouse] = useState<string>("");
    const [marginLeftItemsBox, setMarginLeftItemsBox] = useState<number>(0);

    const itemsBoxContainerRef = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const changeItemsContainerPosition = (e: React.MouseEvent) => {
        if (isMouseOnItemsContainer) {
            console.log("AZAZA");

            console.log(`e.pageY = ${e.pageX}`);
            console.log(`isMouseAfterClickPos = ${mouseAfterClickPos}`);
            

            const betweenMouseAndEl = e.pageX - +mouseAfterClickPos
            // const betweenMouseAndEl = e.pageX - container.current?.getBoundingClientRect().x! - +isMouseAfterClickPos
            // const betweenMouseAndEl = e.pageX - itemsBoxContainerRef.current?.getBoundingClientRect().x!
            // const betweenMouseAndEl = e.pageX - +isMouseAfterClickPos;

            // console.log(`betweenMouseAndEl = ${betweenMouseAndEl}`);
            

            if (betweenMouseAndEl) {
                setMarginLeftItemsBox(betweenMouseAndEl + +mouseAfterClickPosUpMouse);
                // setMarginLeftItemsBox(betweenMouseAndEl);
                // itemsBoxContainerRef.current!.style.marginRight = "-" + betweenMouseAndEl.toString() + "px"
                // itemsBoxContainerRef.current!.style.marginLeft = betweenMouseAndEl.toString() + "px";
            }

            console.log(`itemsBoxContainerRef = ${itemsBoxContainerRef.current?.getBoundingClientRect().x}`);

            // console.log(`e.pageX = ${e.pageX}`);
        }
    };

    return (
        <>
            <div>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} style={{ backgroundColor: "yellow", height: "100px" }}>
                        <Row style={{ backgroundColor: "red" }}>
                            <Col md={1} sm={1}>
                                <div className="compereWithPage-categories">CAT</div>
                                <div className="compereWithPage-categories">CAT</div>
                                <div className="compereWithPage-categories">CAT</div>
                                <div className="compereWithPage-categories">CAT</div>
                            </Col>
                            <Col md={3} sm={5}>
                                <div className="compereWithPage-categories">KEK</div>
                                <div className="compereWithPage-categories">KEK</div>
                                <div className="compereWithPage-categories">KEK</div>
                                <div className="compereWithPage-categories">KEK</div>
                            </Col>
                            <Col md={8} sm={6} style={{ backgroundColor: "blue" }}>
                                <div className="compereWithPage-comperesCategoriesContainer"
                                ref={container}
                                >
                                    <div
                                        ref={itemsBoxContainerRef}
                                        draggable={false}
                                        className="compereWithPage-comperesCategoriesContainer-itemsBox"
                                        style={{ marginLeft: marginLeftItemsBox }}
                                        onMouseDown={(e) => {
                                            setMouseAfterClickPos(e.pageX.toString());
                                            setIsMouseOnItemsContainer(true);
                                        }}
                                        // onMouseOut={() => {
                                        //     setIsMouseOnItemsContainer(false);
                                        // }}

                                        onMouseUp={() => {
                                            setMouseAfterClickPosUpMouse(marginLeftItemsBox.toString())
                                            setIsMouseOnItemsContainer(false);
                                        }}
                                        onMouseEnter={() => {
                                            setIsMouseOnItemsContainer(false);
                                        }}
                                        onMouseMove={(e) => {
                                            changeItemsContainerPosition(e);
                                        }}
                                    >
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                        <div className="box"></div>
                                    </div>
                                </div>
                                {/* <div className="compereWithPage-itemsForCompereContainer">2</div> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default connect(null, null)(CompereWithPage);
