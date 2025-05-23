import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/Components/Layout';
import NotFound from './pages/NotFound/NotFound';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout =
                            route.layout === null
                                ? React.Fragment
                                : route.layout || DefaultLayout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
