import { Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
        <>
            <Navbar bg="dark" expand="lg" style={{ height: "100px" }}>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <div className="item">MDE1</div>
                        <div className="item">MDE2</div>
                        <div className="item">MDE3</div>
                    </Nav>
                    <Nav>
                            <Link to={"basket"} >
                            <div className="basket">basket</div>
                            </Link>
                    </Nav>
                </Navbar.Collapse>
                {/* </div> */}
            </Navbar>
        </>
    );
};

export default connect(null, null)(Header);
