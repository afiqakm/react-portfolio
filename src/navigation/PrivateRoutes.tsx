import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes: FC = () => {
    // const isAuthenticated = Auth.getAuthToken();
    // const expireAt = Auth.getExpireAt();

    // if (!isAuthenticated) return <Navigate to='/login' />;

    // if (expireAt && Number(expireAt) < Date.now()) {
    //     Auth.clearAuthToken();
    //     Auth.clearExpireAt();
    //     return <Navigate to='/login' />;
    // }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default PrivateRoutes;
