import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Carousel } from "../../types/carouselType";

export interface CarouselList {
    carousel: Carousel[];
}

const initialState: CarouselList = {
    carousel: [],
};

const carouselReducer = createSlice({
    name: "carouselReducer",
    initialState,
    reducers: {
        getCarouselAction: (state, action) => {
            state.carousel = action.payload;
        },
    },
});


export const {
    getCarouselAction,
} = carouselReducer.actions;

export default carouselReducer.reducer;

