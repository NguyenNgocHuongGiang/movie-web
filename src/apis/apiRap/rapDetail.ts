import { getThongTinHeThongRapAction } from "../../store/reducers/rapDetail";
import api from "../../utils/apiUtils";
import { Dispatch } from 'redux';
import { GROUPID } from "../../utils/config";
import {getThongTinChiTietPhimAction} from "../../store/reducers/phimDetail";

export const getThongTinHeThongRap = () => {  
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);            
            dispatch(getThongTinHeThongRapAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};


export const getThongTinLichChieuPhim = (maPhim : any) => { 
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);            
            dispatch(getThongTinChiTietPhimAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};
