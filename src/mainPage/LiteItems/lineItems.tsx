import { connect } from "react-redux";
import { actions } from "../../actions and const/actions";
import "./lineItems.css";

type PropsType = {
    setCatalogHeightBody: (height: number) => void
};

const LineItems = (props: PropsType) => {
    return (
        <>
            <div className="lineItems">
                <div
                    className="lineItems-item"
                    onClick={() => {
                        props.setCatalogHeightBody(0);
                    }}
                ></div>
                <div
                    className="lineItems-item"
                    style={{ backgroundColor: "green",height:"25px" }}
                    onClick={() => {
                        props.setCatalogHeightBody(700);
                    }}
                ></div>
            </div>
        </>
    );
};

export default connect(null, {setCatalogHeightBody: actions.setCatalogHeightBody})(LineItems);
