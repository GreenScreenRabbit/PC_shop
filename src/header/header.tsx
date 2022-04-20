import { Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
        <>
            <Navbar bg="dark" expand="lg" style={{ height: "100px" }}>
                <Navbar.Brand href="">
                    <Link to="">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPlxb6bhpxjQliUcd4nolVGOd4QEfKJKpBLA&usqp=CAU"
                        style={{ width: "70px", height: "70px", marginLeft:"30px" }}
                        />
                        </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                    </Nav>
                    <Nav>
                        <Link to={"basket"}>
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
