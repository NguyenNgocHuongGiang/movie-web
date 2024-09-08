import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function News() {
  const newsList = [
    {
      title: "Dân tình 'hóng dài cổ' với cảnh nóng bỏng của Triệu Lệ Dĩnh và Tần Chỉ Lôi",
      image: "https://ss-images.saostar.vn/wwebp1200/2024/8/23/pc/1724424204072/a2yucc8e9r1-56pfalzwkq2-pz31u71akn3.png",
      url: "https://www.saostar.vn/dien-anh/dan-tinh-hong-dai-co-voi-canh-nong-cua-trieu-le-dinh-va-tan-chi-loi-202408232143240727.html",
      description: "Phân cảnh chỉ dài khoảng 15 giây nhưng khiến chục triệu người phát sốt của Triệu Lệ Dĩnh và Tần Chỉ Lôi vì quá nóng bỏng."
    },
    {
      title: "Dàn quái vật không gian gây ám ảnh",
      image: "https://photo.znews.vn/w1200/Uploaded/rohunaa/2024_08_17/alien_1.jpg",
      url: "https://znews.vn/dan-quai-vat-khong-gian-gay-am-anh-post1492531.html",
      description: "'Alien: Romulus' mang trở lại loạt quái vật không gian từng gieo rắc nỗi ám ảnh cho nhiều thế hệ khán giả, đồng thời giới thiệu sinh vật mới, lai tạp giữa con người và Xenomorph."
    },
    {
      title: "Kẻ thù truyền kiếp của Người Nhện",
      image: "https://photo.znews.vn/w1920/Uploaded/rohunaa/2024_08_15/kraven_the_hunter_kyvyxg.jpg",
      url: "https://znews.vn/ke-thu-truyen-kiep-cua-nguoi-nhen-post1492024.html",
      description: "'Là một trong những kẻ thù khét tiếng nhất của Spider-Man trong nguyên tác truyện tranh, việc Kraven the Hunter đặt chân lên màn ảnh thu hút nhiều sự chú ý."
    },
    {
      title: "Vì sao 'Bằng chứng thép 6' bị khán giả chỉ trích, quay lưng?",
      image: "https://photo.znews.vn/w1920/Uploaded/rohunaa/2024_08_13/z5728429812803_74004459bca8aaa47b188cb6cc5182ba.jpg",
      url: "https://photo.znews.vn/w360/Uploaded/rohunaa/2024_08_13/2024080865285585.jpg",
      description: "Từng là thương hiệu phim hình sự đình đám, được yêu thích một thời, 'Bằng chứng thép' trở lại với phần 6 gây không ít thất vọng vì kịch bản lẫn diễn xuất bất ổn."
    },
    {
      title: "‘Ma da’ có Việt Hương đóng thu 16 tỷ đồng",
      image: "https://photo.znews.vn/w860/Uploaded/rohunaa/2024_08_16/madateaser04_1719978999071360649_1_.jpg",
      url: "https://znews.vn/ma-da-co-viet-huong-dong-thu-16-ty-dong-post1492458.html",
      description: "Bộ phim kinh dị do Việt Hương đóng chính dắt túi 16 tỷ đồng sau chưa đầy 2 ngày. Song, chất lượng phim lại gây tranh cãi."
    },
    {
      title: "'Tứ Hải Trọng Minh' có thể là 'Tư Đằng' thứ hai của Cảnh Điềm",
      image: "https://photo.znews.vn/w1200/Uploaded/wyhktpu/2024_08_17/02.jpg",
      url: "https://lifestyle.znews.vn/tu-hai-trong-minh-co-the-la-tu-dang-thu-hai-cua-canh-diem-post1492538.html",
      description: "Cùng có sự góp mặt của người đẹp Cảnh Điềm, thành công của bom tấn 'Tư Đằng' dường như đang lặp lại 'Tứ Hải Trọng Minh' trên FPT Play."
    },
  ];

  useEffect(() => {
    window.scrollTo(0,0)
  })

  return (
    <div className="py-24 bg-gray-950">
      <div className='w-2/3 mx-auto'>
        <h1 className='text-center my-16 font-medium text-4xl text-white'>TIN TỨC</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news, index) => (
            <a 
              href={news.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={index} 
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <div 
                style={{ 
                  background: `url(${news.image})`, 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'center', 
                  backgroundSize: '100%',
                  height: '150px'
                }} 
                className='mx-3 mt-5 mb-3 rounded-lg'
              >
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover opacity-0" />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {news.title.length > 42 ? <span>{news.title.slice(0, 42)} ...</span> : <span>{news.title}</span>}
                </h2>
                <p className="text-gray-400">
                  {news.description.length > 105 ? <span>{news.description.slice(0, 105)} ...</span> : <span>{news.description}</span>}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default News;
