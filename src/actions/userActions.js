// // import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants';


const login = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("http://164.90.158.158/auth/local", {
            identifier: email,
            password
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch
    (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message });

    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
}

export { login, logout };