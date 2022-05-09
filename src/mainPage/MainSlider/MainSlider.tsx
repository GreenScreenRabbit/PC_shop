import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./mainSlider.css";
import slider1 from "../../sliders/slider1.jpg";
import slider2 from "../../sliders/slider2.jpg";
import slider3 from "../../sliders/slider3.jpg";
import slider4 from "../../sliders/slider4.jpg";
import { useEffect, useState } from "react";

const MainSlider = () => {
    const [positionSlider, setPositionSlider] = useState<number>(0);
    const [intervalSliderId, setIntervalSliderId] = useState<NodeJS.Timer>();

    let isContinue = true;

    const slidersImg: string[] = [];
    slidersImg.push(slider1, slider2, slider3, slider4);

    const slidersImgLenght = slidersImg.length;
    let count = positionSlider;

    const stopInterval = () => {
        clearInterval(intervalSliderId!);
    };

    const changePosSlider = (isNextSlider: boolean) => {
        if (isNextSlider) {
            if (slidersImgLenght <= positionSlider + 1) {
                count = 0
                setPositionSlider(0);
            } else {
                count++;
                setPositionSlider(positionSlider + 1);
            }
        } else {
            if (positionSlider - 1! < 0) {
                count = slidersImgLenght - 1
                setPositionSlider(slidersImgLenght - 1);
            } else {
                count--;
                setPositionSlider(positionSlider - 1);
            }
        }

        stopInterval();
        startIntervalSlider();
    };

    const startIntervalSlider = () => {
        let intervalId = setInterval(() => {
            setIntervalSliderId(intervalId);

            if (isContinue) {
                if (slidersImgLenght <= count + 1) {
                    setPositionSlider(0);
                    count = -1;
                } else {
                    count++;
                    setPositionSlider(count);
                }
            }
        }, 5e3);
        setIntervalSliderId(intervalId);
    };

    useEffect(() => {
        startIntervalSlider();
    }, []);

    return (
        <>
            <Row style={{ height: "450px" }}>
                <Col
                    md={{ span: 2 }}
                    className="mainSlider-button"
                    onClick={() => {
                        changePosSlider(false);
                    }}
                ></Col>
                <Col md={{ span: 8 }} style={{ backgroundColor: "blue" }}>
                    <div className="mainSlider-imgCon">
                        <img src={slidersImg[positionSlider]} className="mainSlider-img" />
                    </div>
                </Col>
                <Col
                    className="mainSlider-button"
                    md={{ span: 2 }}
                    onClick={() => {
                        changePosSlider(true);
                    }}
                ></Col>
            </Row>
        </>
    );
};

export default connect(null, null)(MainSlider);
