import { Navigate, Route, Routes } from 'react-router-dom';

import Home from '~containers/home';

const NavRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
);

export default NavRoutes;
