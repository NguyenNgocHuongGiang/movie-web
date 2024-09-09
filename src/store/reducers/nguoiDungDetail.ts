import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { infoLoginResponse, infoRegister } from "../../types/nguoiDungType";
import { TOKEN, USER_LOGIN } from "../../utils/config";

export interface nguoiDungList {
    userLogin: infoLoginResponse;
    userSignUp: infoRegister
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
        "soDt": "",
        "maNhom": "",
        "hoTen": ""
    }
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
            state.userLogin = action.payload
        },
    },
});


export const {
    setLoginAction,
    setRegisterAction
} = nguoiDungReducer.actions;

export default nguoiDungReducer.reducer;

