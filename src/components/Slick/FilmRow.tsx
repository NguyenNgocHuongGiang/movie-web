import React, { useEffect } from 'react'
import styleSlick from "./FilmRow.module.css"
import Phim from "./../Phim/Phim";
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import phimReducer, { getListPhimDangChieuAction, getListPhimSapChieuAction } from '../../store/reducers/phimDetail';
import { RootState, AppDispatch } from '../../store/store';
import { getPhimList } from '../../apis/apiPhim/phimDetail';
import { PhimType } from '../../types/phimType';

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

export default function FilmRow(props: any) {
    const dispatch = useDispatch<AppDispatch>();
    const { phimList, dangChieu, sapChieu } = useSelector((state: RootState) => state.phimReducer)

    useEffect(() => {
        dispatch(getPhimList())
    }, [dispatch])

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "70px",
        slidesToShow: 4,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const handleDangChieu = () => {
       dispatch(getListPhimDangChieuAction())
    };

    const handleSapChieu = () => {
       dispatch(getListPhimSapChieuAction()) 
    };

    const renderPhim = () => {
        return phimList.slice(0, 16).map((item: PhimType, index) => {
            return (
                <div className={`${styleSlick['width-item']}`} key={index}>
                    <Phim phim={item} />
                </div>
            );
        });
    };

    return (
        <div className="slider-container">
            <div className="text-center">
                <button
                    type="button"
                    className={`${styleSlick[dangChieu ? 'active_Film' : 'none_active_Film']} px-8 py-3 font-semibold border rounded dark:border-gray-100 text-white mr-2 mb-10 mt-5`}
                    onClick={handleDangChieu}
                >
                    PHIM ĐANG CHIẾU
                </button>
                <button
                    type="button"
                    className={`${styleSlick[sapChieu ? 'active_Film' : 'none_active_Film']} px-8 py-3 font-semibold border rounded dark:border-gray-100 text-white mr-2 mb-10 mt-5`}
                    onClick={handleSapChieu}
                >
                    PHIM SẮP CHIẾU
                </button>
            </div>
            <Slider {...settings}>
                {renderPhim()}
            </Slider>
        </div>
    )
}
