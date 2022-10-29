import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MoonLoader from "react-spinners/MoonLoader";

// Routes
const Landing = React.lazy(() => import("components/areas/Landing"));
const Hub = React.lazy(() => import("components/routes/Hub"));
const Main = React.lazy(() => import("components/areas/Main"));
const RequireAuth = React.lazy(() =>
    import("@features/authentication/RequireAuth")
);
const BlogFeed = React.lazy(() => import("@features/blog/Feed"));
const BlogForm = React.lazy(() => import("components/areas/Blog/Form"));
const TestForm = React.lazy(() => import("components/areas/Tests/Form"));
const AdminPanel = React.lazy(() => import("components/areas/Admin"));
const AdminTestFeed = React.lazy(() => import("@features/tests/Admin"));
const SinglePostPage = React.lazy(() =>
    import("components/areas/Blog/SinglePostPage")
);
const Blog = React.lazy(() => import("components/routes/WithNavigation/Blog"));
const Tests = React.lazy(() =>
    import("components/routes/WithNavigation/Tests")
);
const Checkout = React.lazy(() => import("components/routes/Checkout"));
const PublicPage = React.lazy(() => import("components/routes"));

export default function AppRouter() {
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>Qlist</title>
                <link rel="canonical" href="https://qlist.coremeridian.xyz" />
                <meta name="og:title" content="A CognitiveTesting production" />
            </Helmet>
            <React.Suspense
                fallback={
                    <MoonLoader
                        color="#254f7b"
                        cssOverride={{
                            margin: "45vh auto 0",
                        }}
                    />
                }
            >
                <Routes>
                    <Route index element={<Landing />} />
                    <Route element={<RequireAuth />}>
                        <Route element={<Hub />}>
                            <Route
                                element={<RequireAuth onRoles={["admin"]} />}
                            >
                                <Route
                                    path="/administration"
                                    element={<AdminPanel />}
                                >
                                    <Route
                                        index
                                        path="tests"
                                        element={<AdminTestFeed />}
                                    />
                                    <Route
                                        path="users"
                                        element={<p>Users</p>}
                                    />
                                    <Route
                                        path="blogs"
                                        element={<p>Blogs</p>}
                                    />
                                </Route>
                            </Route>
                            <Route path="/tests" element={<Tests />}>
                                <Route index element={<Main />} />
                                <Route path="post" element={<TestForm />} />
                            </Route>
                            <Route path="/blog" element={<Blog />}>
                                <Route index element={<BlogFeed />} />
                                <Route path="post" element={<BlogForm />} />
                            </Route>
                            <Route
                                path="/blog/:blogId"
                                element={<SinglePostPage />}
                            />
                        </Route>
                    </Route>
                    <Route element={<PublicPage />}>
                        <Route
                            path="/test/:testId"
                            element={<span>Test Page</span>}
                        />
                    </Route>
                    <Route
                        path="/test/:testId?start"
                        element={<span>Testing Page</span>}
                    />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>Page Not Found!</p>
                            </main>
                        }
                    />
                </Routes>
            </React.Suspense>
        </>
    );
}
