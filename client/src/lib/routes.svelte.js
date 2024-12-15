import handleProtectedRoute from "./handleProtectedRoute.js";
import logoutUser from "./logoutUser.js";

const routes =
    [
        {
            path: `/listings/(?<listingId>.*)`,
            component: async () => import("../pages/ListingPage.svelte"),
            post: async () => {
                return handleProtectedRoute();
            }
        },
        {
            path: `/login`,
            component: async () => import("../pages/LoginPage.svelte")
        },
        {
            path: `/listings`,
            component: async () => import("../pages/ListingsPage.svelte"),
            props: {
                myProps: {
                    expired: false
                }
            },
            post: async () => {
                return handleProtectedRoute();
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
            component: async () => import("../pages/ListingsPage.svelte"),
            props: {
                myProps: {
                    expired: true
                }
            },
            post: async () => {
                return handleProtectedRoute();
            }
        },
        {
            path: "/bids",
            component: async () => import("../pages/BidsPage.svelte"),
            post: async () => {
                return handleProtectedRoute();
            }
        }
    ]

export default routes;