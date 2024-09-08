import React from 'react';
import { PhimType } from './../../types/phimType';  // Giả sử bạn đã định nghĩa kiểu PhimType
import { NavLink } from 'react-router-dom';
import "./Phim.css"

interface PhimProps {
    phim: PhimType;
}

const Phim: React.FC<PhimProps> = ({ phim }) => {
    return (
      <NavLink to={`/detail/${phim.maPhim}`}>
      <main>
          <div className="card h-full bg-gray-900 bg-opacity-75 px-8 pt-4 pb-8 rounded-lg overflow-hidden relative text-gray-200">
              <div style={{ background: `url(${phim.hinhAnh})`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                  <img src={phim.hinhAnh} className='opacity-0 w-full' style={{ height: "auto", maxHeight: "350px" }} />
              </div>
              <div className="card-content">
                  <h2 title-font text-md font-medium text-white h-16 mt-5>
                      {phim.tenPhim.length > 38 ? <span>{phim.tenPhim.slice(0, 38)} ...</span> : <span>{phim.tenPhim}</span>}
                  </h2>
                  <p className="text-left leading-relaxed mb-5 h-16">
                      {phim.moTa.length > 90 ? <span>{phim.moTa.slice(0, 90)} ...</span> : <span>{phim.moTa}</span>}
                  </p>
              </div>
          </div>
      </main>
  </NavLink>
    );
}

export default Phim;
