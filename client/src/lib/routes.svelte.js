const routes =
    [
        {
            path: `/listings/(?<listingId>.*)`,
            component: async () => import("../pages/Deprecated.svelte")

        },
        {
            path: `/listings`,
            component: async () => import("../pages/ListingsPage.svelte")
        },
        {
            path: `/dev`,
            component: async () => import("../pages/ListingPage.svelte")
        }
    ]

export default routes;