import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="pt-20 pb-10  text-white body-font bg-gray-950">
    <div className="w-4/5 px-6 mx-auto space-y-6 divide-y dark:divide-gray-600 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
            <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                <div className="flex justify-center space-x-3 md:justify-start">
                    <div className="flex items-center justify-center w-20 h-20">
                        <img src='https://img.freepik.com/premium-vector/film-production-cinema-logo-design-template_618034-260.jpg' className='rounded-xl'/>
                    </div>
                    <span className="self-center text-2xl font-semibold">CINEMA BOOKING</span>
                </div>
            </div>
            <div className="col-span-6 text-center md:text-left md:col-span-3">
                <p className="pb-1 text-lg font-medium">Hệ thống rạp</p>
                {/* <div className='lg:pr-14 md:pr-5 sm:pr-0 grid grid-cols-4'>
                    {arrHeThongRap.map((heThongRap, index) => {
                        return <div className='mt-5'>
                            <img src={heThongRap.logo} width={35} />
                        </div>
                    })}

                </div> */}
            </div>
            <div className="col-span-6 text-center md:text-left md:col-span-3">
                <p className="pb-5 text-lg font-medium">Category</p>
                <ul style={{lineHeight: "30px"}}>
                    <li>
                        <NavLink to='/' className="hover:dark:text-yellow-400">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/news' className="hover:dark:text-yellow-400">News</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className="hover:dark:text-yellow-400">Contact</NavLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
            <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                <span>©2024 All rights reserved</span>
                <a rel="noopener noreferrer" href="#">
                    <span>Privacy policy</span>
                </a>
                <a rel="noopener noreferrer" href="#">
                    <span>Terms of service</span>
                </a>
            </div>
        </div>
    </div>
</footer>
  )
}
