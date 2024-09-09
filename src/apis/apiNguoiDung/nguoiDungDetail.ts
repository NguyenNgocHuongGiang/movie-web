import { setLoginAction, setRegisterAction } from "../../store/reducers/nguoiDungDetail";
import { infoLogin } from "../../types/nguoiDungType";
import api from "../../utils/apiUtils";
import { Dispatch } from 'redux';
import { TOKEN, USER_LOGIN } from "../../utils/config";

export const setLogin = (info : infoLogin, navigate:any, location:any) => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.post('QuanLyNguoiDung/DangNhap', info);
            dispatch(setLoginAction(res.data.content));
            if (location.state?.from === '/register') {
                navigate(-2); 
            } else {
                navigate(-1); 
            }
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};

export const setRegister = (info : infoLogin, navigate:any) => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.post('QuanLyNguoiDung/DangKy', info);
            dispatch(setRegisterAction(res.data.content));
            navigate("/login", { state: { from: "/register" } });
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};

export const setLogout = (navigate:any, location:any) => {
    return async () => {        
        try {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);            
            navigate(location.pathName) 
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};

