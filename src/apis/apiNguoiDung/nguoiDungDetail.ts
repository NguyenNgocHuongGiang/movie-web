import { getUserInfoAndHistoryAction, setLoginAction, setRegisterAction, updateUserInfoAndHistoryAction } from "../../store/reducers/nguoiDungDetail";
import { infoLogin, updateUser } from "../../types/nguoiDungType";
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

export const getInfoUserAndHistory = () => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.post(`QuanLyNguoiDung/ThongTinTaiKhoan`);           
            dispatch(getUserInfoAndHistoryAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};

export const updateUserInfor = (info : updateUser) => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, info)
            dispatch(updateUserInfoAndHistoryAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};