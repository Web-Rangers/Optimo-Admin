import { type AppType } from 'next/dist/shared/lib/utils';
import SidebarLayout from '../components/layouts/SidebarHeaderLayout';

import '../styles/globals.css';
import { useRouter } from 'next/router';

const MyApp: AppType = ({ Component, pageProps }) => {
    const { pathname } = useRouter();

    if (pathname === '/auth') return <Component {...pageProps} />;
    return (
        <SidebarLayout>
            <Component {...pageProps} />
        </SidebarLayout>
    );
};

export default MyApp;
