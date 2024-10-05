import { clearGheDaDatTruocAction, getChiTietPhongVeAction, getDanhSachGheChonAction } from "../../store/reducers/datVeDetail";
import api from "../../utils/apiUtils";
import { Dispatch } from 'redux';

export const getDanhSachPhongVe = (id : string) => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
            dispatch(getChiTietPhongVeAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};

export const setDatVe = (thongTinDatVe : any) => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.post(`QuanLyDatVe/DatVe`, thongTinDatVe);
            dispatch(getChiTietPhongVeAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};

export const clearGhe = () => {
    return async (dispatch: Dispatch) => {        
        try {
            dispatch(clearGheDaDatTruocAction());
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};
