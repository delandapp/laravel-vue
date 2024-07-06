<script setup>
import axios from "axios";
import { ref } from "vue";
import { useToastSweet } from "../../toastsweet";
import { formatCreatedAt } from "../../helper.js";
const toast = useToastSweet();
defineProps({
    user: Object,
    index: Number,
});

const emit = defineEmits(["userDeleted", "editUser"]);

const deleteUser = (id) => {
    toast.DeleteToast(
        () => {
            axios
                .delete(`/api/users/${id}`)
                .then((response) => {
                    emit("userDeleted", id);
                    toast.Toast({
                        icon: "success",
                        title: "User deleted successfully",
                    });
                })
                .catch((error) => {
                    toast.Toast({
                        icon: "error",
                        title: error.response.data.message,
                    });
                });
        },
        () => {}
    );
};

const roles = ref([
    {
        name: "ADMIN",
        value: 1,
    },
    {
        name: "USER",
        value: 2,
    },
]);

const editUser = (user) => {
    emit("editUser", user);
};

const changeRole = (user, role) => {
    axios
        .put(`/api/users/updateRole/${user.id}`, { role })
        .then((response) => {
            user.role = response.data.role;
            toast.Toast({
                icon: "success",
                title: "User role updated successfully",
            });
        })
        .catch((error) => {
            toast.Toast({
                icon: "error",
                title: error.response.data.message,
            });
        });
};
</script>

<template>
    <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ formatCreatedAt(user.created_at) }}</td>
        <td>
            <select
                name="role-form"
                @change="changeRole(user, $event.target.value)"
                class="form-control"
            >
                <option
                    v-for="role in roles"
                    :value="role.value"
                    :key="role.value"
                    :selected="role.name === user.role"
                >
                    {{ role.name }}
                </option>
            </select>
        </td>
        <td>
            <a href="#" @click.prevent="editUser(user)"
                ><i class="fa fa-edit"></i
            ></a>

            <a href="#" @click.prevent="deleteUser(user.id)"
                ><i class="fa fa-trash"></i
            ></a>
        </td>
    </tr>
</template>
