import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LichChieuPhim, Ghe } from "../../types/datVeType";

export interface PhongVelList {
    chiTietPhongVe: LichChieuPhim;
    danhSachGheDangDat: any[]
}

const initialState: PhongVelList = {
    chiTietPhongVe: {
        thongTinPhim: {
            "maLichChieu": 0,
            "tenCumRap": '',
            "tenRap": '',
            "diaChi": '',
            "tenPhim": '',
            "hinhAnh": '',
            "ngayChieu": '',
            "gioChieu": '',
        },
        danhSachGhe: [
            {
                "maGhe": 0,
                "tenGhe": "",
                "maRap": 0,
                "loaiGhe": "",
                "stt": "",
                "giaVe": 0,
                "daDat": false,
                "taiKhoanNguoiDat": ""
            }
        ]
    },
    danhSachGheDangDat: []
};

const datVeReducer = createSlice({
    name: "datVeReducer",
    initialState,
    reducers: {
        getChiTietPhongVeAction: (state, action) => {
            state.chiTietPhongVe = action.payload;
        },
        getDanhSachGheChonAction:(state, action) => {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.payload.maGhe)
            
            if(index !== -1){
                danhSachGheCapNhat.splice(index,1)
            }else{
                danhSachGheCapNhat.push(action.payload)
            }
            return {...state, danhSachGheDangDat : danhSachGheCapNhat}
        },
        clearGheDaDatTruocAction : (state) => {
            state.danhSachGheDangDat = [];
        },
    },
});


export const {
    getChiTietPhongVeAction,
    getDanhSachGheChonAction,
    clearGheDaDatTruocAction
} = datVeReducer.actions;

export default datVeReducer.reducer;

