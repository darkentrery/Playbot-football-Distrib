import "./EventInfoSlider.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination';

export const EventInfoSlider = ({images, className = ''}) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    return (
        <div className={"event-info-slider " + className}>
            {images ?
                <Swiper
                    modules={[Pagination]}
                    navigation={true}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                >
                    {images.map((e, i) => (
                        <SwiperSlide key={i}>
                            {/* <img src={serverUrl + e.photo} alt="" /> */}
                            <img src={e} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            : null}
        </div>
    )
}

export default EventInfoSlider