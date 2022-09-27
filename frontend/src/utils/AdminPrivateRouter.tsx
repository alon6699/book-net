import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../types/types";

const AdminRoute = () => {
    const loggedInUser = useSelector((state: RootState) => state.auth.user);

    return loggedInUser?.role === 'Admin' ? <Outlet /> : <Navigate to="/forbidden" />;
}

export default AdminRoute;

