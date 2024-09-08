import React, { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function UserTemplate() {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    
    return <Fragment>
        <div className="flex justify-center items-center min-h-screen" style={{ backgroundImage: `url('./wrappicture.jpg')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Outlet />
        </div>
    </Fragment >
}

