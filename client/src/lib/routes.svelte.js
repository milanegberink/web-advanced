const routes =
    [
        {
            path: `/listings/(?<listingId>.*)`,
            component: async () => import("../pages/ListingPage.svelte")

        },
        {
            path: `/listings`,
            component: async () => import("../pages/ListingsPage.svelte")
        }
    ]

export default routes;