import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import { publicRoutes } from './app/routes';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function App() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <Routes>
            {/* <LocaleProvider locale={enUS}> */}
            {publicRoutes.map((route, index) => {
                const Layout = route.layout === null ? Fragment : route.layout;
                const Page = route.component;
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout t={t}>
                                <Page history={navigate} t={t} />
                            </Layout>
                        }
                    />
                );
            })}
            {/* </LocaleProvider> */}
        </Routes>
    );
}
