import { useEffect } from 'react';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCarouselDetail } from '../../../apis/apiCarousel/carouselDetailApi';
import { Carousel as CarouselType } from '../../../types/carouselType';
import { RootState, AppDispatch } from '../../../store/store';
import { CSSProperties } from 'react'; 

const contentStyle: CSSProperties = {
    height: '700px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

export default function HomeCarousel() {
    const dispatch = useDispatch<AppDispatch>();
    const carouselList = useSelector((state: RootState) => state.carouselReducer.carousel);

    useEffect(() => {
        dispatch(getCarouselDetail());
    }, [dispatch]);

    const renderImg = () => {
        return carouselList.map((item: CarouselType, index: number) => (
            <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} className="opacity-0" alt={item.hinhAnh} />
                </div>
            </div>
        ));
    };

    return (
        <Carousel style={{ width: '100%', padding: 0, margin: 0 }} autoplay>
            {renderImg()}
        </Carousel>
    );
}
