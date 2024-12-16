import handleProtectedRoute from "./handleProtectedRoute.js";
import logoutUser from "./logoutUser.js";

const routes =
    [
        {
            path: `/listings/(?<listingId>.*)`,
            component: async () => import("../pages/protected/ListingPage.svelte"),
            post: async () => {
                return handleProtectedRoute('user');
            }
        },
        {
            path: `/login`,
            component: async () => import("../pages/LoginPage.svelte")
        },
        {
            path: `/listings`,
            component: async () => import("../pages/protected/ListingsPage.svelte"),
            props: {
                myProps: {
                    expired: false
                }
            },
            post: async () => {
                return handleProtectedRoute('user');
            }
        },
        {
            path: '/logout',
            pre: async () => {
                await logoutUser();
            }
        },
        {
            path: '/register',
            component: async () => import("../pages/RegisterPage.svelte")
        },
        {
            path: "/archive",
            component: async () => import("../pages/protected/ListingsPage.svelte"),
            props: {
                myProps: {
                    expired: true
                }
            },
            post: async () => {
                return handleProtectedRoute('user');
            }
        },
        {
            path: "/bids",
            component: async () => import("../pages/protected/BidsPage.svelte"),
            post: async () => {
                return handleProtectedRoute('user');
            }
        },
        {
            path: "/admin",
            component: async () => import("../pages/protected/+admin/AdminPage.svelte"),
            post: async () => {
                return handleProtectedRoute('admin');
            }
        }
    ]

export default routes;