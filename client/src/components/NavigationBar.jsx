import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

const NavigationBar = () => {


    return (
        <Navbar bg="light" expand="lg" style={{height:'4rem'}}>
            <Container fluid>
                <Navbar.Brand>
                    <Link className="text-decoration-none text-black" to="/">
                        DishQr
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle style={{marginBottom:'1rem'}} aria-controls="navbarScroll" />
                <Navbar.Collapse style={{backgroundColor: "#f8f9fa", zIndex:1000}} id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Link className="nav-link text-decoration-none text-black" to="/newOrders">
                            Nowe zamówienia
                        </Link>

                        <Link className="nav-link text-decoration-none text-black" to="/signin">
                            Zamówienia w toku
                        </Link>

                        {/*{<Nav.Link>*/}
                        {/*    <Link onClick={() => {localStorage.removeItem('token'); window.location.href = "/";}} className="text-decoration-none text-black" to="/">*/}
                        {/*        Wyloguj się*/}
                        {/*    </Link>*/}
                        {/*</Nav.Link>}*/}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;
