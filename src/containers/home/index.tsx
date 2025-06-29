import React from 'react';

import LogoAnimation from '~components/LogoAnimation';
import { useNavActions } from '~utils/navActions';

const Home = () => {
    const { navToAboutMe } = useNavActions();

    return (
        <div className='flex flex-col gap-4 justify-center items-center h-screen'>
            <p className='text-2xl font-bold text-black'>
                Home
            </p>

            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => navToAboutMe()}
            >
                About us
            </button>

            {/* <LogoAnimation /> */}
        </div>
    );
};

export default Home;
