import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from "antd";
import { useDispatch } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { USER_LOGIN } from './../../utils/config';
import { setLogout } from '../../apis/apiNguoiDung/nguoiDungDetail';
import { AppDispatch } from '../../store/store';

export default function Header() {
    const userItem = localStorage.getItem(USER_LOGIN)
    let user
    if (userItem) {
        user = JSON.parse(userItem);
    }

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()

    const items = [
        {
            key: '1',
            label: (
                <NavLink to='/history'><p>Thông tin tài khoản</p></NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <p onClick={() => {
                    dispatch(setLogout(navigate, location))
                }}>Đăng xuất</p>
            ),
        },
    ];

    return (
        <header className="p-32 pt-4 pb-4 bg-coolGray-100 text-coolGray-800 bg-black text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://img.freepik.com/premium-vector/film-production-cinema-logo-design-template_618034-260.jpg" className='w-20 rounded-xl' alt="logo" />
                </NavLink>
                <ul className="items-stretch hidden space-x-5 lg:flex">
                    <li className="flex">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `flex items-center px-4 -mb-1 ${isActive ? 'border-b-2 border-yellow-400' : ''}`}
                        >
                            Trang chủ
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to="/news"
                            className={({ isActive }) => `flex items-center px-4 -mb-1 ${isActive ? 'border-b-2 border-yellow-400' : ''}`}
                        >
                            Tin tức
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => `flex items-center px-4 -mb-1 ${isActive ? 'border-b-2 border-yellow-400' : ''}`}
                        >
                            Liên hệ
                        </NavLink>
                    </li>
                </ul>
                {user ? (
                    <div className="items-center flex-shrink-0 hidden lg:flex relative">
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow={{
                                pointAtCenter: true,
                            }}
                        >
                            <p><UserOutlined className='text-lg bg-gray-200 text-black p-2 rounded-full mr-2' /> {user.taiKhoan}</p>
                        </Dropdown>
                    </div>
                ) : (
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <button className="self-center px-2 py-1 rounded">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `px-8 py-3 ${isActive ? 'font-semibold rounded bg-yellow-400 text-gray-50' : ''}`
                                }
                            >
                                Đăng nhập
                            </NavLink>
                        </button>
                        <button className="self-center px-2 py-1 ">
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `px-8 py-3 ${isActive ? 'font-semibold rounded bg-yellow-400 text-gray-50' : ''}`
                                }
                            >
                                Đăng ký
                            </NavLink>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
