import { Fragment, useEffect } from 'react'
import { USER_LOGIN } from '../../utils/config';
import { useNavigate, useParams } from 'react-router-dom';
import style from "./Checkout.module.css"
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css'
import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Divider } from 'antd';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { getDanhSachPhongVe, setDatVe } from '../../apis/apiDatVe/datVeDetail';
import { Ghe, ThongTinDatVe } from '../../types/datVeType';
import { getDanhSachGheChonAction } from '../../store/reducers/datVeDetail';

export default function Checkout() {
  const userItem = localStorage.getItem(USER_LOGIN)
  let user: any
  if(userItem){
    user = JSON.parse(userItem)
  }

  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const [loading, setLoading] = useState(true);

  let { chiTietPhongVe, danhSachGheDangDat } = useSelector((state:RootState) => state.datVeReducer)

  console.log(chiTietPhongVe);
  
  useEffect(() => {
    setLoading(true);
    if(id){
      dispatch(getDanhSachPhongVe(id))
    }
    setLoading(false);
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-300">
        <Loading />
      </div>
    );
  }

  const { danhSachGhe, thongTinPhim } = chiTietPhongVe

  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : ''
      let classGheDangDat = ''
      let classGheDaDuocDat = ''
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
      if (indexGheDD !== -1) {
        classGheDangDat = 'gheDangDat'
      }

      if (user.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }

      return <Fragment>
        <button onClick={() => {
          dispatch(getDanhSachGheChonAction(ghe))
        }} disabled={ghe.daDat} className={`${classGheVip} ${classGheDangDat} ${classGheDaDat} ${classGheDaDuocDat} ghe`} key={index}>{ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined /> : <CloseOutlined /> : ghe.stt}</button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className='bg-gray-200'>
      <div className='grid lg:grid-cols-12 grid-cols-1'>
        <div className='lg:col-span-9 col-span-1 py-14' style={{ maxHeight: 'calc(1000vh - 60px)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

          <div className='w-[1100px]'>
            <div className={`${style['screen']} shadow-xl text-gray-950 text-sm`} style={{ width: '80%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
              Screen
            </div>

            <div className='' style={{ overflowX: 'auto', margin: '25px auto', width: '80%' }}>
              <div className=''>{renderSeats()}</div>
            </div>

            <div className='flex justify-center w-3/4' style={{ margin: '3rem auto', width: '80%' }}>
              <table className='min-w-full divide-y border border-gray-500 divide-gray-500 bg-gray-900 bg-opacity-5'>
                <thead>
                  <tr>
                    <th>Ghế đã được đặt</th>
                    <th>Ghế Vip</th>
                    <th>Ghế thường</th>
                    <th>Ghế đang được chọn</th>
                    <th>Ghế người dùng đã đặt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-center'><button className='ghe gheDaDat text-center'><CloseOutlined /></button></td>
                    <td className='text-center'><button className='ghe gheVip text-center'>00</button></td>
                    <td className='text-center'><button className='ghe text-center'>00</button></td>
                    <td className='text-center'><button className='ghe gheDangDat text-center'>00</button></td>
                    <td className='text-center'><button className='ghe gheDaDuocDat text-center'><UserOutlined /></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>


        <div className='lg:col-span-3 col-span-1 px-10 py-10 bg-yellow-400 min-h-screen'>
          <h1 className='text-2xl font-semibold mb-3'>Thông tin đặt vé</h1>

          <hr className='mx-auto my-4 bg-gray-100 border-0 dark:bg-gray-900' style={{ width: '100%', height: '1.5px' }} />

          <h3 className='text-xl'>{thongTinPhim?.tenPhim}</h3>
          <p className='my-3'>Địa điểm: {thongTinPhim?.tenCumRap} - {thongTinPhim?.diaChi}</p>
          <p className='mb-3'>Ngày chiếu: {thongTinPhim?.ngayChieu}</p>
          <p className='mb-3'>Suất chiếu: {thongTinPhim?.gioChieu}  - {thongTinPhim?.tenRap}</p>

          <Divider variant="dashed" style={{ borderColor: 'black' }} dashed ></Divider>

          <div className='flex flex-row my-5'>
            <div className='w-4/5'><span className=''>Ghế:</span> {_.sortBy(danhSachGheDangDat, ['stt']).map((ghe:Ghe, index:number) => { return <span key={index}>{ghe.stt} </span> })}</div>
            <div className='text-right w-1/5'>
              <span className='text-xl font-medium'>
                {danhSachGheDangDat.reduce((tongTien, ghe, index) => { return tongTien += ghe.giaVe }, 0).toLocaleString()}
              </span></div>
          </div>

          <Divider variant="dashed" style={{ borderColor: 'black' }} dashed ></Divider>

          <div>
            <div className='mt-5'>
              <span>Người đặt: {user.hoTen}</span>
            </div>
            <div className='my-2'>
              <span>Email: {user.email}</span>
            </div>
            <div>
              <span>Số điện thoại: {user.soDT}</span>
            </div>
          </div>
          <div className='mt-7'><button className='bg-gray-800 w-full py-3 text-lg rounded-xl text-white hover:bg-gray-100 hover:text-yellow-500 hover:text-xl hover:font-medium' onClick={() => {
            const thongTinDatVe:ThongTinDatVe = {
              maLichChieu: 0,
              danhSachVe: []
            }
            thongTinDatVe.maLichChieu = Number(id)
            thongTinDatVe.danhSachVe = danhSachGheDangDat
            dispatch(setDatVe(thongTinDatVe))
            // navigate("/history")
          }}>Đặt vé</button></div>
        </div>
      </div>
    </div>
  )
}


