import React, { Fragment, useEffect } from 'react';
import { USER_LOGIN } from '../../utils/config';
import { Navigate, Outlet } from 'react-router-dom';

export default function CheckoutTemplate() {
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Navigate to="/login" />
    }

    return <Fragment>
        <Outlet />
    </Fragment>
}

