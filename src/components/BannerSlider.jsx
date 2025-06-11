
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// function BannerSlider({ movies }) {
//   return (
//     <Swiper
//       spaceBetween={10}
//       slidesPerView={3}
//       loop={true}
//       autoplay={{ delay: 3000 }} // Automatically move the slide every 3 seconds
//     >
//       {movies?.map((movie) => (
//         <SwiperSlide key={movie.id}>
//           <div
//             className="relative w-full h-[400px] bg-cover bg-center rounded-lg"
//             style={{
//               backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
//             }}
//           >
//             <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
//               <h2 className="text-white text-xl font-bold">{movie.title}</h2>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// export default BannerSlider;
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function BannerSlider({ movies }) {
  return (
    <Swiper
      spaceBetween={10}          // Khoảng cách giữa các slide
      slidesPerView={1}          // Hiển thị một slide mỗi lần
      loop={true}                // Bật chế độ xoay vòng
      autoplay={{ delay: 3000 }} // Tự động chuyển slide sau mỗi 3 giây
      effect="fade"              // Thêm hiệu ứng mờ khi chuyển đổi slide
      pagination={{ clickable: true }} // Tính năng phân trang
      className="banner-slider"  // Thêm class để dễ dàng định kiểu CSS nếu cần
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div
            className="relative w-full h-[400px] bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <h2 className="text-white text-xl font-bold">{movie.title}</h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerSlider;
