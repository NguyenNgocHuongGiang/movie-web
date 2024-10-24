import { getListPhimAction } from "../../store/reducers/phimDetail";
import api from "../../utils/apiUtils";
import { Dispatch } from 'redux';
import {GROUPID} from "./../../utils/config"

export const getPhimList = () => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
            dispatch(getListPhimAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};


export const addPhim = (formdata: any) => {
    return async () => {
      const res = await api.post(`QuanLyPhim/ThemPhimUploadHinh`, formdata)
      return res.data.content;
    };
  };
  
  export const deletePhim = (maPhim: any) => {
    return async () => {
      const res = await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      return res.data.content;
    };
  };