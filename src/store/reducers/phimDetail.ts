import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhimType } from "../../types/phimType";

export interface PhimList {
    phimList: PhimType[];
    phimListDefault: PhimType[];
    dangChieu: boolean,
    sapChieu: boolean
    phimDetail: PhimType
}

const initialState: PhimList = {
    phimList: [],
    phimListDefault: [],
    dangChieu: false,
    sapChieu: false,
    phimDetail: {
        heThongRapChieu: [],
      maPhim: 0,
      tenPhim: '',
      biDanh: '',
      trailer: '',
      hinhAnh: '',
      moTa: '',
      maNhom: '',
      hot: false,
      dangChieu: false,
      sapChieu: false,
      ngayKhoiChieu: '',
      danhGia: 0
    }
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
        getThongTinChiTietPhimAction: (state, action) => {
            state.phimDetail = action.payload
        },
    },
});


export const {
    getListPhimAction,
    getListPhimDangChieuAction,
    getListPhimSapChieuAction,
    getThongTinChiTietPhimAction
} = phimReducer.actions;

export default phimReducer.reducer;

