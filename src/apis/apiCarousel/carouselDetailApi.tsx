import { getCarouselAction } from "../../store/reducers/carouselDetail";
import api from "../../utils/apiUtils";
import { Dispatch } from 'redux';

export const getCarouselDetail = () => {
    return async (dispatch: Dispatch) => {        
        try {
            const res = await api.get('QuanLyPhim/LayDanhSachBanner');
            dispatch(getCarouselAction(res.data.content));
        } catch (err) {
            console.error('Failed to fetch carousel details', err);
        }
    };
};
