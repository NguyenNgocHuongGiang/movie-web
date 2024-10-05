import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { USER_LOGIN } from './../../utils/config';
import moment from 'moment';
import { QRCodeSVG } from 'qrcode.react';
import { Modal, Button, Divider } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AppDispatch, RootState } from '../../store/store';
import { getInfoUserAndHistory, updateUserInfor } from '../../apis/apiNguoiDung/nguoiDungDetail';
import { Acc, Ghe, SelectedGroup, Ve } from '../../types/thongTinVeDaDat';

export default function History() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch<AppDispatch>();
    const { userInfoAndHistory } = useSelector((state:RootState) => state.nguoiDungReducer);
    const userItem = localStorage.getItem(USER_LOGIN)
    let user: any
    if(userItem){
      user = JSON.parse(userItem)
    }

    if(!user){
        navigate("/login")
    }

    useEffect(() => {
        setLoading(true);
        dispatch(getInfoUserAndHistory());
        setLoading(false);
    },[dispatch]);    

    // if(loading){
    //     return <div><Loading/></div>
    // }

    const formik = useFormik({
        initialValues: {
            taiKhoan: user?.taiKhoan || '',
            matKhau: userInfoAndHistory?.matKhau || '',
            hoTen: user?.hoTen || '',
            email: user?.email || '',
            soDT: user?.soDT || '',
            maLoaiNguoiDung: user?.maLoaiNguoiDung || '',
            maNhom: user?.maNhom || ''
        },
        enableReinitialize: true,
        onSubmit: values => {
            const userChange = {
                taiKhoan: values.taiKhoan || user?.taiKhoan,
                matKhau: values.matKhau || userInfoAndHistory?.matKhau,
                hoTen: values.hoTen || user?.hoTen,
                email: values.email || '',
                soDT: values.soDT || user?.soDT,
                maLoaiNguoiDung: values.maLoaiNguoiDung || userInfoAndHistory?.maLoaiNguoiDung,
                maNhom: user.maNhom
            };
            dispatch(updateUserInfor(userChange));
            const { matKhau, ...userWithoutPassword } = userChange;
            localStorage.setItem(USER_LOGIN, JSON.stringify(userWithoutPassword));
            dispatch(getInfoUserAndHistory());
        },
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<SelectedGroup | null>(null);

    const showModal = (group : any) => {
        setSelectedGroup(group);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const renderLichSu = () => {
        if (!userInfoAndHistory || !Array.isArray(userInfoAndHistory.thongTinDatVe)) {
            return null;
        }      

        const groupedVe = userInfoAndHistory.thongTinDatVe?.reduce((acc: Acc, ve:Ve) => {
            ve.danhSachGhe.forEach((ghe) => {
                const key = `${ghe.tenHeThongRap}-${ghe.tenRap}-${ve.ngayDat}-${ve.tenPhim}`;
                if (!acc[key]) {
                    acc[key] = {
                        tenHeThongRap: ghe.tenHeThongRap,
                        tenRap: ghe.tenRap,
                        maVe: ve.maVe,
                        ngayDat: ve.ngayDat,
                        giaVe: ve.giaVe,
                        tenPhim: ve.tenPhim,
                        thoiLuongPhim: ve.thoiLuongPhim,
                        danhSachGhe: [],
                    };
                }
                acc[key].danhSachGhe.push(ghe);
            });
            return acc;
        }, {});

        const groupedVeArray = Object.values(groupedVe);
        groupedVeArray.sort((b:any, a:any) => new Date(a.ngayDat).getTime() - new Date(b.ngayDat).getTime());
        
        
        return (
            <div className="flex flex-wrap">
                {groupedVeArray.map((group:any, index) => (
                    <div key={index} className="p-4 w-full">
                        <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                            <div className="flex-grow">
                                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                                   Mã vé: {group.maVe} - ({group.tenHeThongRap}) - {group.tenRap}
                                </h2>
                                <div className='mb-2'>
                                    <span className='text-yellow-600 font-medium'>{group.tenPhim}</span> - {group.thoiLuongPhim} phút - Ghế: {group.danhSachGhe.map((ghe:Ghe, index:number) => <span key={index} className='text-green-700' >{ghe.tenGhe} </span>)}
                                </div>
                                <h3 className='mb-2'>Tổng tiền đã thanh toán: {(group.giaVe * group.danhSachGhe.length).toLocaleString('vi-VN')} VND</h3>
                                <div className='text-right'><Button onClick={() => showModal(group)}>Xem Chi Tiết</Button></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <h1>hi</h1>
            <div className='pt-32 pb-20'>
                <div className='grid md:grid-cols-12 grid-cols-1 w-3/4' style={{ margin: '0 auto' }}>
                    <div className='md:col-span-5 col-span-1'>
                        <h1 className='text-2xl font-medium text-center'>Thông tin</h1>
                        <form onSubmit={formik.handleSubmit} style={{ margin: '1rem auto' }} className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 bg-opacity-70 dark:text-gray-800">
                            <div className="space-y-6">
                                <div className="space-y-1 text-sm">
                                    <label htmlFor="hoTen" className="block dark:text-gray-600">Họ và tên</label>
                                    <input type="text" name="hoTen" onChange={formik.handleChange} id="hoTen" placeholder="Họ tên" className="w-full px-4 py-3 rounded-md bg-gray-50 text-gray-800 border border-gray-500" value={formik.values.hoTen} />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                                    <input type="email" name="email" onChange={formik.handleChange} id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md bg-gray-50 text-gray-800 border border-gray-500" value={formik.values.email} />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <label htmlFor="soDT" className="block dark:text-gray-600">Số điện thoại</label>
                                    <input type="text" name="soDT" onChange={formik.handleChange} id="soDT" placeholder="Số điện thoại" className="w-full px-4 py-3 rounded-md bg-gray-50 text-gray-800 border border-gray-500" value={formik.values.soDT} />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                                    <input type="text" name="taiKhoan" onChange={formik.handleChange} id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md bg-gray-50 text-gray-800 border border-gray-500" value={formik.values.taiKhoan} />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                                    <input type="password" name="matKhau" onChange={formik.handleChange} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md bg-gray-50 text-gray-800 border border-gray-500" value={formik.values.matKhau} />
                                </div>
                                <button className="block w-full p-3 text-center rounded-md dark:text-gray-50 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-400 dark:hover:bg-yellow-500">Cập nhật</button>
                            </div>
                        </form>
                    </div>

                    <div className='md:col-span-7 col-span-1'>
                        <h1 className='text-2xl font-medium text-center'>Lịch sử đặt vé</h1>
                        <div className='h-[600px] overflow-y-auto'>{renderLichSu()}</div>
                    </div>
                </div>
            </div>

            <Modal title={<h1 className='text-lg font-semibold'>CHI TIẾT VÉ - MÃ {selectedGroup?.maVe}</h1>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {selectedGroup && (
                    <div>
                        <Divider variant="dashed" style={{ borderColor: 'black' }} dashed ></Divider>
                        <div className='text-center'>
                            <QRCodeSVG value={JSON.stringify(selectedGroup)} size={128} style={{ margin: '0 auto' }} />
                        </div>
                        <div className='mt-5'><span className='font-medium'>Phim: </span>{selectedGroup.tenPhim}</div>
                        <div className='my-2'><span className='font-medium'>Hệ thống rạp: </span> {selectedGroup.tenHeThongRap}</div>
                        <div><span className='font-medium'>Rạp: </span> {selectedGroup.tenRap}</div>
                        <div className='my-2'><span className='font-medium'>Ghế: </span> {selectedGroup.danhSachGhe.map((ghe, index) => <span key={index} className='font-medium text-lg text-red-600' >{ghe.tenGhe} </span>)}</div>
                        <div className='my-2'><span className='font-medium'>Giờ - ngày đặt: </span> {moment(selectedGroup.ngayDat).format('hh:mm A - DD/MM/YYYY')}</div>
                        <div className='my-2'><span className='font-medium'>Tổng tiền: </span> {(selectedGroup.giaVe * selectedGroup.danhSachGhe.length).toLocaleString('vi-VN')} VND <span className='ml-6 text-green-700 font-medium'><CheckCircleOutlined /> Đã thanh toán</span></div>
                    </div>
                )}
            </Modal>
        </div>
    )
}
