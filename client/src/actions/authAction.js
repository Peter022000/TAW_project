import axios from 'axios';
import {CHANGE_PASSWORD_SUCCESS, EXPIRED, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../types/authTypes';
import { decode } from "base-64";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

global.atob = decode;

export const login = (email, password) => async (dispatch, getState) => {
    try {

        const body = JSON.stringify({
            email: email,
            password: password
        })

        const response = await axios.post('http://192.168.1.2:8080/users/signin', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const token = response.data.token;

        const decoded = jwtDecode(token);

        console.log(decoded.role[0])

        if(decoded.role[0] !== "ROLE_ADMIN") {
            toast.error("Zaloguj się jako administrator" , {position: "top-center", autoClose: 2000});
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: response.data.token,
                    email: decoded.sub,
                    expirationTime: decoded.exp,
                    creationTime: decoded.iat,
                    role: decoded.role[0],
                },
            });

            toast.success("Zalogowano" , {position: "top-center", autoClose: 2000});
        }
    } catch (error) {
        toast.error("Błędny email lub hasło" , {position: "top-center", autoClose: 2000});
    }
};

export const changePassword = (oldPassword, newPassword, repeatNewPassword) => async (dispatch, getState) => {
    try {

        const body = JSON.stringify({
            oldPassword: oldPassword,
            newPassword: repeatNewPassword,
            repeatNewPassword: repeatNewPassword
        })

        const state = getState();
        const token = state.auth.token;

        const response = await axios.put('http://192.168.1.2:8080/users/changePassword', body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });
        toast.success("Zmieniono hasło" , {position: "top-center", autoClose: 2000});
    } catch (error) {
        toast.error("Jedno z haseł nie pasuje" , {position: "top-center", autoClose: 2000});
    }
};


export const isExpired = () => async (dispatch, getState) => {
    try {
        const state = getState();

        if(state.auth.isLogged){
            const dateNow = new Date();
            const expirationTimeInMilliseconds = state.auth.expirationTime * 1000;
            if(expirationTimeInMilliseconds < dateNow.getTime()) {
                dispatch({
                    type: EXPIRED,
                });
                toast.info("Token wygasł, wylogowano" , {position: "top-center", autoClose: 2000});
            }
        }
    } catch (error) {
        console.error(error);
    }
};


export const logOut = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });

    toast.info("Wylogowano" , {position: "top-center", autoClose: 2000});
};
