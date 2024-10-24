import {
  getUserInfoAndHistoryAction,
  getUserListAction,
  setLoginAction,
  setRegisterAction,
  updateUserInfoAndHistoryAction,
} from "../../store/reducers/nguoiDungDetail";
import { infoLogin, updateUser } from "../../types/nguoiDungType";
import api from "../../utils/apiUtils";
import { Dispatch } from "redux";
import { GROUPID, TOKEN, USER_LOGIN } from "../../utils/config";

export const setLogin = (info: infoLogin, navigate: any, location: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await api.post("QuanLyNguoiDung/DangNhap", info);
      dispatch(setLoginAction(res.data.content));
      if (res.data.content.maLoaiNguoiDung === "KhachHang") {
        if (location.state?.from === "/register") {
          navigate(-2);
        } else {
          navigate(-1);
        }
      } else {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Failed to fetch carousel details", err);
    }
  };
};

export const setRegister = (info: infoLogin, navigate: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await api.post("QuanLyNguoiDung/DangKy", info);
      dispatch(setRegisterAction(res.data.content));
      navigate("/login", { state: { from: "/register" } });
    } catch (err) {
      console.error("Failed to fetch carousel details", err);
    }
  };
};

export const setLogout = (navigate: any, location: any) => {
  return async () => {
    try {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(TOKEN);
      if (location.pathName !== undefined) {
        navigate(location.pathName);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Failed to fetch carousel details", err);
    }
  };
};

export const getInfoUserAndHistory = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await api.post(`QuanLyNguoiDung/ThongTinTaiKhoan`);
      dispatch(getUserInfoAndHistoryAction(res.data.content));
    } catch (err) {
      console.error("Failed to fetch carousel details", err);
    }
  };
};

export const updateUserInfor = (info: updateUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await api.put(
        `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        info
      );
      dispatch(updateUserInfoAndHistoryAction(res.data.content));
    } catch (err) {
      console.error("Failed to fetch carousel details", err);
    }
  };
};

export const updateUser2 = (info: updateUser) => {
  return async (dispatch: Dispatch) => {
      const res = await api.post(
        `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        info
      );
      return res.data.content;
  };
};

export const deleteUser = (taiKhoan: any) => {
  return async () => {
    const res = await api.delete(`QuanLyNguoiDung/XoaNguoiDung`, taiKhoan);
    return res.data.content;
  };
};

export const getUserList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await api.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
      );
      dispatch(getUserListAction(res.data.content));
    } catch (err) {
      console.error("Failed to fetch carousel details", err);
    }
  };
};

export const addUser = (info: any) => {
  return async () => {
    const res = await api.post(`QuanLyNguoiDung/ThemNguoiDung`, info)
    return res.data.content;
  };
};
