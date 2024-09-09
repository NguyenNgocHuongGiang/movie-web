import { useFormik } from 'formik';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setLogin } from '../../apis/apiNguoiDung/nguoiDungDetail';
export default function Login() {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state:RootState) => state.nguoiDungReducer)  

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      dispatch(setLogin(values, navigate, location))
    },
  });

  return (
    <form 
    onSubmit={formik.handleSubmit} 
    className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 bg-opacity-70 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <div className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">Username</label>
          <input type="text" name="taiKhoan" 
          onChange={formik.handleChange} 
          id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md  bg-gray-50 text-gray-800 focus:border-yellow-400" />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">Password</label>
          <input type="password" name="matKhau" 
          onChange={formik.handleChange} 
          id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md  bg-gray-50 text-gray-800 focus:dark:border-yellow-400" />
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
          </div>
        </div>
        <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 bg-yellow-400">Sign in</button>
      </div>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don't have an account?
        <NavLink rel="noopener noreferrer" to='/register' className="underline dark:text-gray-800"> Sign up</NavLink>
      </p>
    </form>
  )
}
