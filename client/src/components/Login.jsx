import React, {useState} from 'react';
import '../App.css';
import {
    MDBContainer,
    MDBInput,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBCardImage
} from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {decodeToken} from "react-jwt";

const Login = (props) => {

    const [login, setLogin] = useState('');
    const [loginPlaceHolder, setLoginPlaceHolder] = useState('Wprowadź login');

    const [password, setPassword] = useState('');
    const [passwordPlaceHolder, setPasswordPlaceHolder] = useState('Wprowadź hasło');

    const validate = () => {
        let status = true;
        if (login === '') {
            alert("Wprowadź login!");
            status = false;
        } else if (password === '') {
            alert("Wprowadź hasło!");
            status = false;
        }

        return status;
    }

    const send = () => {
        axios({
            method: 'POST',
            url: 'https://at.usermd.net/api/user/auth',
            data: {
                login: login,
                password: password,
            }}).then(response => {
                localStorage.setItem("token", response.data["token"]);
                alert("Zalogowano jako: " + decodeToken(localStorage.getItem('token'))["name"]);
                window.location.href = "/";
            }).catch((error: AxiosError) => alert(error.response.data));
    }

    const singUp = () =>{
        if(validate()){
            send();
        }
    }


    return (
        <div className="page-container">
            <div className="content-wrap">
                <MDBContainer fluid>
                    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Logowanie</p>

                                    <MDBInput placeholder={loginPlaceHolder} value={login} onChange={e => setLogin(e.target.value)} wrapperClass='mb-4' label='Login' id='form1' type='email'/>
                                    <MDBInput placeholder={passwordPlaceHolder} value={password} onChange={e => setPassword(e.target.value)} wrapperClass='mb-4' label='Hasło' id='form2' type='password'/>

                                    <Button onClick={() => singUp()} className="mb-4">Zaloguj się</Button>

                                    <div className="text-center">
                                        <p>Nie jesteś członkiem? <Link to="/signup">Zarejestruj</Link></p>
                                    </div>
                                </MDBCol>
                                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                    <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        </div>
    );
};

export default Login;
