import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeThongRapType } from "../../types/heThongRapType";

export interface HeThongRapList {
    heThongRap: HeThongRapType[];
}

const initialState: HeThongRapList = {
    heThongRap: [],
};

const rapReducer = createSlice({
    name: "rapReducer",
    initialState,
    reducers: {
        getThongTinHeThongRapAction: (state, action) => {
            state.heThongRap = action.payload;
        },      
    },
});


export const {
    getThongTinHeThongRapAction
} = rapReducer.actions;

export default rapReducer.reducer;

