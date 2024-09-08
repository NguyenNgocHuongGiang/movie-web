import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhimType } from "../../types/phimType";

export interface PhimList {
    phimList: PhimType[];
    phimListDefault: PhimType[];
    dangChieu: boolean,
    sapChieu: boolean
}

const initialState: PhimList = {
    phimList: [],
    phimListDefault: [],
    dangChieu: false,
    sapChieu: false
};

const phimReducer = createSlice({
    name: "phimReducer",
    initialState,
    reducers: {
        getListPhimAction: (state, action) => {
            state.phimList = action.payload;
            state.phimListDefault = state.phimList
        },
        getListPhimDangChieuAction: (state) => {
            state.dangChieu = true;
            state.sapChieu = false;
            state.phimList = state.phimListDefault.filter((item:PhimType) => item.dangChieu === true)
        },
        getListPhimSapChieuAction: (state) => {
            state.dangChieu = false;
            state.sapChieu = true;
            state.phimList = state.phimListDefault.filter((item:PhimType) => item.sapChieu === true)
        },
    },
});


export const {
    getListPhimAction,
    getListPhimDangChieuAction,
    getListPhimSapChieuAction
} = phimReducer.actions;

export default phimReducer.reducer;

