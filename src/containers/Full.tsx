import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavRoutes from '~navigation/Routes';

const Full = () => {
    return (
        <BrowserRouter>
            <NavRoutes />
        </BrowserRouter>
    );
};

export default Full;
