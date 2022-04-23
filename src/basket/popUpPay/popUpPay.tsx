import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./popUpPay.css";

type PropsType = {
    isShowPopUpFit: boolean;
    isHaveDontFitEquipment: boolean;
    setIsShowPopUpFit: (bol: boolean) => void;
};

const PopUpPay = (props: PropsType) => {
    const [isShowDontCareFit, setIsShowDontCareFit] = useState<boolean>(false);

    useEffect(() => {
        if (props.isHaveDontFitEquipment == true) {
            setIsShowDontCareFit(true);
        }
    }, []);

    return (
        <>
            <div className="popUpPay-body">
                <div
                    className="popUpPay-closeBut"
                    onClick={() => {
                        props.setIsShowPopUpFit(false);
                    }}
                ></div>
                {isShowDontCareFit ? (
                    <>
                        <div className="popUpPay-dontFit-text">SOMETHING NOT FIT</div>
                        <button
                            className="popUpPay-dontFit-dontCareBut"
                            onClick={() => {
                                setIsShowDontCareFit(false);
                            }}
                        >
                            DONT CARE
                        </button>
                    </>
                ) : (
                    <div>
                        <img
                            src="https://www.pngitem.com/pimgs/m/22-226960_download-success-png-image-green-like-button-png.png"
                            className="popUpPay-fit-img"
                        />
                        <div className="popUpPay-fit-text">SUCCESS</div>
                        <button
                            className="popUpPay-fit-okBut"
                            onClick={() => {
                                props.setIsShowPopUpFit(false);
                            }}
                        >
                            OK{" "}
                        </button>
                    </div>
                )}
            </div>
            <div className="popUpPay-wallPaper"></div>
        </>
    );
};

export default connect(null, null)(PopUpPay);
