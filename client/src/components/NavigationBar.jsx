import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useLocation} from "react-router-dom";
import {
    MDBCollapse,
    MDBContainer, MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarNav,
    MDBNavbarToggler
} from "mdb-react-ui-kit";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { SAVE_NEW_ORDER} from "../types/orderActionTypes";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {isExpired} from "../actions/authAction";

const NavigationBar = () => {
    const [openNavText, setOpenNavText] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new SockJS('http://192.168.1.2:8080/ws', null, { withCredentials: true, transports: 'websocket' });
        const stompClient = Stomp.over(socket);

        const connectCallback = () => {
            stompClient?.subscribe('/topic/newOrder', (message) => {
                const newOrder = JSON.parse(message.body);
                dispatch({
                    type: SAVE_NEW_ORDER,
                    payload: {
                        data: newOrder,
                    },
                });
            });
        };

        const errorCallback = (error) => {
            console.error('Socket connection error:', error);
            toast.error('Socket connection error. Please refresh the page.');
        };

        stompClient?.connect({}, connectCallback, errorCallback);

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [dispatch]);

    const location = useLocation();

    useEffect(() => {
        dispatch(isExpired());
    }, [location]);


    return (
        <MDBNavbar expand='lg' light bgColor='light' style={{ height: '4rem' }}>
            <MDBContainer fluid>
                <MDBNavbarBrand>
                    DishQr
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarText'
                    aria-controls='navbarText'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNavText(!openNavText)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse style={{ backgroundColor: "#f8f9fa", color: 'f8f9fa', zIndex: 1000, padding: "1.2rem" }} navbar open={openNavText}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/new-orders'>
                                Nowe zamówienia
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/orders-in-preparation'>
                                Zamówienia w przygotowaniu
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/served-orders'>
                                Wydane zamówienia
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/completed-orders'>
                                Zakończone zamówienia
                            </Link>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <MDBNavbarNav className='ml-auto justify-content-end'>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/admin-panel'>
                                Panel administratora
                            </Link>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavigationBar;
