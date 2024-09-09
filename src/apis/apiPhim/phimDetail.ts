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

