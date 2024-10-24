import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { infoLoginResponse, infoRegister, updateUser, userList } from "../../types/nguoiDungType";
import { TOKEN, USER_LOGIN } from "../../utils/config";

export interface nguoiDungList {
    userLogin: infoLoginResponse;
    userSignUp: infoRegister,
    userInfoAndHistory : any,
    userUpdate: updateUser
    userList: userList[]
}

const initialState: nguoiDungList = {
    userLogin: {
        "taiKhoan": "",
        "hoTen": "",
        "email": "",
        "soDT": "",
        "maNhom": "",
        "maLoaiNguoiDung": "",
        "accessToken": ""
    },
    userSignUp: {
        "taiKhoan": "",
        "matKhau": "",
        "email": "",
        "soDT": "",
        "maNhom": "",
        "hoTen": ""
    },
    userInfoAndHistory: {},
    userUpdate: {
        "taiKhoan": "",
        "matKhau": "",
        "email": "",
        "soDT": "",
        "maNhom": "",
        "maLoaiNguoiDung": "",
        "hoTen": ""
    },
    userList: []
};

const nguoiDungReducer = createSlice({
    name: "nguoiDungReducer",
    initialState,
    reducers: {
        setLoginAction: (state, action) => {
            const thongTinDangNhap = action.payload
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap))
            state.userLogin = thongTinDangNhap
            localStorage.setItem(TOKEN, JSON.stringify(thongTinDangNhap.accessToken))
        },
        setRegisterAction: (state, action) => {
            state.userSignUp = action.payload
        },
        getUserInfoAndHistoryAction: (state, action) => {
            state.userInfoAndHistory = action.payload
        },
        updateUserInfoAndHistoryAction: (state, action) => {
            state.userUpdate = action.payload
        },
        getUserListAction: (state, action) => {
            state.userList = action.payload
        }
    },
});


export const {
    setLoginAction,
    setRegisterAction,
    getUserInfoAndHistoryAction,
    updateUserInfoAndHistoryAction,
    getUserListAction
} = nguoiDungReducer.actions;

export default nguoiDungReducer.reducer;

