import { Navigate, Route, Routes } from 'react-router-dom';

// import PrivateRoutes from './PrivateRoutes';

import { NavigationConstants } from '~utils/constants';
import Home from '~containers/home';
import AboutMe from '~containers/aboutMe';

// const PrivateBucket = () => {
//     return (
//         <>
//             <Route path='/' element={<PrivateRoutes />}>
//                 <Route index element={<Navigate replace to={NavigationConstants.homePage} />} />

//                 <Route path={NavigationConstants.homePage} element={<Home />} />
//                 <Route path={NavigationConstants.aboutMePage} element={<AboutMe />} />

//                 <Route path='*' element={<Navigate replace to={NavigationConstants.homePage} />} />
//             </Route>
//         </>
//     );
// };

const NavRoutes = () => {
    return (
        <Routes>
            {/* Public Route */}
            <Route path={NavigationConstants.homePage} element={<Home />} />
            <Route path={NavigationConstants.aboutMePage} element={<AboutMe />} />

            {/* Private Route */}
            {/* {PrivateBucket()} */}
        </Routes>
    );
};

export default NavRoutes;
