import { connect } from "react-redux";
import "./popUpFit.css";

type PropsType = {
    isPopUpFitOpen:boolean
}

const PopUpFit = (props:PropsType) => {
    return (
        <div className="popUpFit" style={{opacity: props.isPopUpFitOpen ? "100%" : "0%", height: props.isPopUpFitOpen ? "100%" : "0%"  }}>

        <div className="popUpFit-wallpaper"></div>
            <div className="popUpFit-body" >

            </div>
        </div>

    );
};

export default connect(null, null)(PopUpFit);
