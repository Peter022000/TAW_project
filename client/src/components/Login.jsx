import React, {useState} from 'react';
import '../App.css';
import {
    MDBContainer,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import {useDispatch} from "react-redux";
import {login} from "../actions/authAction";
import {toast} from "react-toastify";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        let status = true;
        if (email === '') {
            toast.error("Wprowadź email!" , {position: "top-center", autoClose: 2000});
            status = false;
        } else if (password === '') {
            toast.error("Wprowadź hasło!" , {position: "top-center", autoClose: 2000});
            status = false;
        }

        return status;
    }

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login(email, password))
    }

    const singUp = () =>{
        if(validate()){
            handleLogin();
        }
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Email'
                        id='form1'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Hasło'
                        id='form2'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <MDBBtn className="button" onClick={() => singUp()}>Zaloguj</MDBBtn>
                </MDBContainer>
            </div>
        </div>
    );
};

export default Login;
