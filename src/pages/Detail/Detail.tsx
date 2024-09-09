import React, { useEffect, useState } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
// import "./../../assets/styles/circle.css"
import { Tabs, Rate } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getThongTinLichChieuPhim } from '../../apis/apiRap/rapDetail';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import "./Detail.css"
import { Cinema, CinemaSystem } from '../../types/phimType';

export default function Detail() {
  const { phimDetail } = useSelector((state:RootState) => state.phimReducer)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('1');

  const { id } = useParams()
  
  const dispatch = useDispatch<AppDispatch>()

  const handleTrailer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (key:any) => {
    setActiveKey(key);
  };

  useEffect(() => {
    dispatch(getThongTinLichChieuPhim(id))
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    window.scrollTo(0,0)
  })

  return (
    <div style={{ 
      backgroundImage: `url(${phimDetail.hinhAnh})`,
       backgroundSize: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <CustomCard
        style={{ paddingTop: '150px', minHeight: '100vh' }}
        effectColor="rgba(255,255,2555,0.18)"
        color="rgba(255,255,2555,0.18)"
        blur={25}
        borderRadius={0}
      >
        <div className='grid grid-cols-12'>
          <div className='col-span-6 col-start-3'>
            <div className='grid grid-cols-3'>
              <img className='col-span-1' src={phimDetail.hinhAnh} style={{ width: '200px', height: '300px' }} />
              <div className='col-span-2 flex flex-col justify-center'>
                <p className='mb-3 pr-20 text-gray-300'>{moment(phimDetail.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                <p className='text-3xl text-white font-medium pr-20'>{phimDetail.tenPhim}</p>
                <button className='bg-yellow-400 text-white mt-5 px-10 py-2 rounded-lg' style={{ width: '40%' }} onClick={handleTrailer}>Xem Trailer</button>
              </div>
            </div>
          </div>
          <div className='col-span-3'>
            <div className={`c100 p${phimDetail.danhGia * 10} big`} >
              <span>{phimDetail.danhGia}/10</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
            <Rate allowHalf value={phimDetail.danhGia / 2} style={{ marginLeft: "15%" }} />
          </div>
        </div>

        <Tabs defaultActiveKey="1" centered className="mt-28" onChange={handleTabChange}>
          <TabPane
            tab={<div className={`px-5 py-2 rounded-lg hover:font-bold hover:text-black text-lg ${activeKey === '1' ? 'text-xl text-white bg-zinc-700' : ''}`}> Lịch chiếu </div>}
            key="1"
          >
            <div className="bg-gray-950 bg-opacity-20 w-2/3 m-auto">
              <Tabs tabPosition="left" className="px-10 py-16 container">
                {phimDetail.heThongRapChieu?.map((htr: CinemaSystem, index:number ) => {
                  return <TabPane tab={<div style={{ width: '80px' }}> <img src={htr.logo} width={50} className="rounded-full" alt="logo" /> </div>} key={index} >
                    {htr.cumRapChieu?.slice(0, 3).map((cumRap: Cinema, index:number) => {
                      return <div style={{ width: '700px', display: 'flex' }}>
                        <img src={cumRap.hinhAnh} style={{ width: '80px', height: '80px' }} />
                        <div >
                          <div className='ml-3 text-left text-gray-300'>
                            <div>{cumRap.tenCumRap}</div>
                            <div>
                              {cumRap.diaChi}
                            </div>
                          </div>
                          <div className='thong-tin-lich-chieu grid grid-cols-5 text-gray-300 ml-3 mt-3'>
                            {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                              return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className='border border-gray-200 py-1 px-1 rounded-lg hover:bg-yellow-400 hover:font-medium hover:text-black hover:border-yellow-400'>
                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            })}
                          </div>
                        </div>
                      </div>
                    })}
                  </TabPane>
                })}
              </Tabs>
            </div>
          </TabPane>

          <TabPane
            tab={<div className={`px-5 py-2 rounded-lg hover:font-bold hover:text-black text-lg ${activeKey === '2' ? 'text-xl text-white bg-zinc-700' : ''}`}>Thông tin</div>}
            key="2"
          >
            <div className="bg-gray-950 bg-opacity-20 w-2/3 m-auto px-10 py-10 text-md text-white">
              <div className='grid grid-cols-12 px-10'>
                <div className='col-span-6 start-cols-3'>
                  <p><span className='bg-yellow-400 text-white px-3 py-1 font-semibold mr-3 rounded-2xl'>Ngày khởi chiếu</span> {moment(phimDetail.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                </div>
                <div className='col-span-6 px-10 '>
                  <span className='bg-yellow-400 text-white px-3 py-1 font-semibold mr-3 rounded-2xl mb-5'>Nội dung</span>
                  <p className='mt-3 ml-2' >{phimDetail.moTa}</p>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>

      </CustomCard >

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleCloseModal}>
          <div className="" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="800"
                height="500"
                src={phimDetail.trailer}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div >
  )
}
