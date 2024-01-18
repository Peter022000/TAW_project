import {MDBBtn, MDBContainer, MDBDropdownItem} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logOut} from "../actions/authAction";

const AdminPanel = () => {

    const isLogged = useSelector((state) => state.auth.isLogged);

    const dispatch = useDispatch();

    return(
        <div className="page-container d-flex align-items-center justify-content-center">
            <div className="content-wrap text-center d-flex align-items-center justify-content-center">
                <MDBContainer>
                    <div className="d-grid gap-3">
                        {!isLogged ?
                            <Link to="/admin-panel/login">
                                <MDBBtn className="button button2">
                                    Zaloguj
                                </MDBBtn>

                            </Link>
                            :
                            <>
                                <Link to="/admin-panel"
                                      onClick={() => {
                                          dispatch(logOut())
                                      }}>
                                    <MDBBtn className="button button2">
                                        Wyloguj
                                    </MDBBtn>
                                </Link>
                                <Link to="/admin-panel/change-password">
                                    <MDBBtn className="button button2">
                                        Zmień hasło
                                    </MDBBtn>
                                </Link>
                                <Link to='/admin-panel/edit-menu'>
                                    <MDBBtn className="button button2">
                                        Zarządzanie menu
                                    </MDBBtn>
                                </Link>
                                <Link to='/admin-panel/edit-discount'>
                                    <MDBBtn className="button button2">
                                        Zarządzanie promocją
                                    </MDBBtn>
                                </Link>
                                <Link to='/admin-panel/edit-qr-code'>
                                    <MDBBtn className="button button2">
                                        Zarządzanie kodami QR
                                    </MDBBtn>
                                </Link>
                                <Link to='/admin-panel/statistics'>
                                    <MDBBtn className="button button2">
                                        Statystyki
                                    </MDBBtn>
                                </Link>
                            </>
                        }
                    </div>
                </MDBContainer>
            </div>
        </div>
    );
}

export default AdminPanel;
