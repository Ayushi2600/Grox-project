import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import './SwaperSlider.scss';

// Images
import threeDCoin from '../../images/3Dasset.png';
import threeDCoin2 from '../../images/3Dasset2.png';
import threeDCoin3up from '../../images/3Dasset3Up.png';
import threeDCoin3Down from '../../images/3Dasset3Down.png';

const slideArray = [
  {
    img: threeDCoin,
    name: 'Grox is Money That Grows',
    desc: 'Backed by real assets, transparent ROI',
  },
  {
    img: threeDCoin2,
    name: 'Send Money. No Fees. Anywhere.',
    desc: 'Remittances made seamless',
  },
  {
    img: threeDCoin3up,
    name: 'Cash Out or Stake with Full Control',
    desc: 'Spend it, grow it, or withdraw instantly',
  },
];
const SwaperSlider = () => {
  return (
    <div className='swiper-container'>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        loop={true}
        pagination={{ clickable: true }}
      >
        {slideArray?.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className='hero-image'>
                <img src={item.img} alt={`img${idx}`} />
                {idx === 2 && (
                  <img
                    className='secImg'
                    src={threeDCoin3Down}
                    alt={`threeDCoin3Down}`}
                  />
                )}
              </div>
              <div className='hero-text'>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwaperSlider;
