import React, {useState} from 'react';
import '../App.css';
import {
    MDBContainer,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import {useDispatch} from "react-redux";
import {changePassword, login} from "../actions/authAction";
import {toast} from "react-toastify";

const ChangePassword = (props) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const dispatch = useDispatch();

    const changePasswordHandle = () =>{
        if (!oldPassword || !newPassword || !repeatNewPassword) {
            toast.error("Wszystkie pola muszą być uzupełnione", { position: "top-left", autoClose: 2000 });
        } else {
            dispatch(changePassword(oldPassword, newPassword, repeatNewPassword));
        }
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Stare hasło'
                        id='form2'
                        type='password'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Nowe hasło'
                        id='form2'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <MDBInput
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        wrapperClass='mb-4'
                        label='Powtórz nowe hasło'
                        id='form2'
                        type='password'
                        value={repeatNewPassword}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                    />
                    <MDBBtn className="button" onClick={() => changePasswordHandle()}>Zmień hasło</MDBBtn>
                </MDBContainer>
            </div>
        </div>
    );
};

export default ChangePassword;
