import React from 'react'
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from "./../../utils/config"
import { AppDispatch, RootState } from '../../store/store';
import { setRegister } from '../../apis/apiNguoiDung/nguoiDungDetail';

export default function Register() {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      email: '',
      soDT : '',
      maNhom: GROUPID
    },
    onSubmit: values => {    
      dispatch(setRegister(values, navigate))
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 bg-opacity-70 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center">Sign up</h1>
      <div className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="hoTen" className="block dark:text-gray-600">Họ và tên</label>
          <input type="text" name="hoTen" onChange={formik.handleChange} id="hoTen" placeholder="Họ tên" className="w-full px-4 py-3 rounded-md  bg-gray-50 text-gray-800 focus:border-yellow-400" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block dark:text-gray-600">Email</label>
          <input type="email" name="email" onChange={formik.handleChange} id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md  bg-gray-50 text-gray-800 focus:border-yellow-400" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="soDT" className="block dark:text-gray-600">Số điện thoại</label>
          <input type="text" name="soDT" onChange={formik.handleChange} id="soDT" placeholder="Số điện thoại" className="w-full px-4 py-3 rounded-md  bg-gray-50 text-gray-800 focus:border-yellow-400" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">Username</label>
          <input type="text" name="taiKhoan" onChange={formik.handleChange} id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md  bg-gray-50 text-gray-800 focus:border-yellow-400" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">Password</label>
          <input type="password" name="matKhau" onChange={formik.handleChange} id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md  bg-gray-50 text-gray-800 focus:dark:border-yellow-400" />
        </div>
        <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 bg-yellow-400">Sign up</button>
      </div>
    </form>
  )
}
