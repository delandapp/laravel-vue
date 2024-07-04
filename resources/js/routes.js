import Dashboard from "./components/Dashboard.vue";
import Jadwal from "./pages/Jadwal.vue";
export default [
    {
        path: "/admin/dashboard",
        name: "admin.dashboard",
        component: Dashboard,
    },
    {
        path: "/admin/jadwal",
        name: "admin.jadwal",
        component: Jadwal,
    },
    {
        path: "/admin/user",
        name: "admin.user",
        component: Jadwal,
    },
    {
        path: "/admin/settings",
        name: "admin.settings",
        component: Jadwal,
    },
    {
        path: "/admin/profile",
        name: "admin.profile",
        component: Jadwal,
    },
    {
        path: "/logout",
        name: "logout",
        component: Jadwal,
    },
];
