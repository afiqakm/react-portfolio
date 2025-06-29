import React from 'react';

import { useNavActions } from '~utils/navActions';

const AboutMe = () => {
    const { navToHome } = useNavActions();

    return (
        <div className='flex flex-col gap-4 justify-center items-center h-screen'>
            <p className='text-2xl font-bold text-black'>
                About Me
            </p>

            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => navToHome()}
            >
                Home
            </button>
        </div>
    );
};

export default AboutMe;
