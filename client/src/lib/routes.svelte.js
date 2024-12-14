import handleProtectedRoute from "./checkIfTokenValid.js";
import logoutUser from "./logoutUser.js";

const routes =
    [
        {
            path: `/listings/(?<listingId>.*)`,
            component: async () => import("../pages/ListingPage.svelte"),
            post: async () => {
                return handleProtectedRoute("listings/(?<listingId>.*)", async () => import("../pages/ListingPage.svelte"));
            }
        },
        {
            path: `/login`,
            component: async () => import("../pages/LoginPage.svelte")
        },
        {
            path: `/listings`,
            pre: async () => {
                return handleProtectedRoute("listings", async () => import("../pages/ListingsPage.svelte"));
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
        }
    ]

export default routes;