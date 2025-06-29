import { useNavigate } from 'react-router-dom';

import { NavigationConstants } from './constants';

export const useNavActions = () => {
    const navigate = useNavigate();

    const navPush = (routeName: string) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
        navigate(routeName);
    };

    const navReplace = (routeName: string) => {
        navigate(routeName, { replace: true });
    };

    const navToHome = (): void => navPush(NavigationConstants.homePage);
    const navToAboutMe = (): void => navPush(NavigationConstants.aboutMePage);

    return {
        navPush,
        navReplace,
        navToHome,
        navToAboutMe
    };
};
