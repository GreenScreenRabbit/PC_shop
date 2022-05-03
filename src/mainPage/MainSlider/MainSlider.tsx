import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./mainSlider.css";
import slider1 from "../../sliders/slider1.jpg";
import slider2 from "../../sliders/slider2.jpg";
import slider3 from "../../sliders/slider3.jpg";
import slider4 from "../../sliders/slider4.jpg";
import { useEffect, useState } from "react";

// let slider1 =  require("'../../sliders/slider1.jpg")

const MainSlider = () => {
    const [positionSlider, setPositionSlider] = useState<number>(0);
    const [intervalSliderId, setIntervalSliderId] = useState<NodeJS.Timer>();


    let isContinue = true;
    
    const slidersImg: string[] = [];
    slidersImg.push(slider1, slider2, slider3, slider4);

    
    const slidersImgLenght = slidersImg.length;


    const stopInterval = () => {
        clearInterval(intervalSliderId!)
    }

    const changePosSlider = (isNextSlider: boolean) => {
        if (isNextSlider) {
            if (slidersImgLenght <= positionSlider + 1) {
                setPositionSlider(0);
            } else {
                setPositionSlider(positionSlider + 1);
            }
        } else {
            if (positionSlider - 1! < 0) {
                setPositionSlider(slidersImgLenght - 1);
            } else {
                setPositionSlider(positionSlider - 1);
            }
        }


        stopInterval()
        startIntervalSlider();
    };
    
    const startIntervalSlider = () => {
        
        let count = positionSlider;
        
        let intervalId = setInterval(() => {
            
            setIntervalSliderId(intervalId)


            count++;

            if (isContinue) {
                if (slidersImgLenght <= count + 1) {
                    setPositionSlider(0);
                    count = -1;
                } else {
                    setPositionSlider(count + 1);
                }
            } 
        }, 5e3);

        setIntervalSliderId(intervalId)

        console.log("START");
        
    };

    useEffect(() => {
        startIntervalSlider();
    }, []);

    return (
        <>
            <Row style={{ backgroundColor: "red", height: "450px" }}>
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
