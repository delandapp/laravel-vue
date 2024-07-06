import Dashboard from "./components/Dashboard.vue";
import Jadwal from "./pages/jadwal/ListJadwal.vue";
import UserList from "./pages/users/UserList.vue";
import UpdateSettings from "./pages/settings/UpdateSettings.vue";
import UpdateProfile from "./pages/profile/UpdateProfile.vue";
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
        component: UserList,
    },
    {
        path: "/admin/settings",
        name: "admin.settings",
        component: UpdateSettings,
    },
    {
        path: "/admin/profile",
        name: "admin.profile",
        component: UpdateProfile,
    },
    {
        path: "/logout",
        name: "logout",
        component: Jadwal,
    },
];
