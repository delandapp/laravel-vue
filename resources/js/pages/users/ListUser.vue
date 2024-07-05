<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import $ from "jquery";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useToastSweet } from "../../toastsweet";
// const toast = useToastr();
const toast = useToastSweet();
const users = ref([]);
const editing = ref(false);
const form = ref(null);
const formValue = ref({});
const schemaCreate = yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});
const schemaEdit = yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().when((password, schema) => {
        return password ? schema.min(8) : schema;
    }),
});

const getUsers = () => {
    axios.get("/api/users").then((response) => {
        users.value = response.data;
    });
};

const createUser = (values, { resetForm, setFieldError }) => {
    // console.log(values);
    axios
        .post("/api/users", values)
        .then((response) => {
            $("#formUserModal").modal("hide");
            // getUsers();
            // Or
            // users.value.push(response.data);
            // Or
            users.value.unshift(response.data);
            resetForm();
            toast.Toast({
                icon: "success",
                title: "User created successfully",
            });
        })
        .catch((error) => {
            toast.Toast({
                icon: "error",
                title: error.response.data.message,
            });
            setFieldError("email", error.response.data.errors.email[0]);
        });
};

const addUser = () => {
    editing.value = false;
    $("#formUserModal").modal("show");
};

const handlingForm = (values, action) => {
    if (editing.value) {
        updateUser(values, action);
    } else {
        createUser(values, action);
    }
};

const updateUser = (user, { resetForm, setFieldError }) => {
    axios
        .put(`/api/users/${formValue.value.id}`, user)
        .then((response) => {
            const index = users.value.findIndex((u) => u.id === user.id);
            users.value[index] = response.data;
            $("#formUserModal").modal("hide");
            toast.Toast({
                icon: "success",
                title: "User updated successfully",
            });
        })
        .catch((error) => {
            toast.Toast({
                icon: "error",
                title: error.response.data.message,
            });
            setFieldError("email", error.response.data.errors.email[0]);
        });
};

const deleteUser = (id) => {
    toast.DeleteToast(
        () => {
            axios
                .delete(`/api/users/${id}`)
                .then((response) => {
                    const index = users.value.findIndex((u) => u.id === id);
                    users.value.splice(index, 1);
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
        () => getUsers()
    );
};

const editUser = (user) => {
    editing.value = true;
    formValue.value = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
    $("#formUserModal").modal("show");
};

onMounted(() => {
    getUsers();
});
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Starter List User</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <a
                                href="https://adminlte-io.translate.goog/themes/v3/starter.html?_x_tr_sl=en&amp;_x_tr_tl=id&amp;_x_tr_hl=id&amp;_x_tr_pto=sc#"
                                >Home</a
                            >
                        </li>
                        <li class="breadcrumb-item active">Jadwal</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <button
                type="button"
                class="mb-2 btn btn-primary"
                @click="addUser()"
            >
                Add New User
            </button>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Bordered Table</h3>
                        </div>

                        <div class="card-body">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Registered Date</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(user, index) in users"
                                        :key="user.id"
                                    >
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ user.name }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>{{ user.created_at }}</td>
                                        <td>{{ user.role }}</td>
                                        <td>
                                            <a
                                                href="#"
                                                @click.prevent="editUser(user)"
                                                ><i class="fa fa-edit"></i
                                            ></a>

                                            <a
                                                href="#"
                                                @click.prevent="
                                                    deleteUser(user.id)
                                                "
                                                ><i class="fa fa-trash"></i
                                            ></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade"
                    id="formUserModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="staticBackdropLabel"
                                >
                                    <span v-if="editing"
                                        >Editing User Form</span
                                    >
                                    <span v-else>Create User Form</span>
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <Form
                                autocomplete="off"
                                @submit="handlingForm"
                                :validation-schema="
                                    editing ? schemaEdit : schemaCreate
                                "
                                v-slot="{ errors }"
                                :initial-values="formValue"
                                ref="form"
                            >
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <Field
                                            :class="{
                                                'is-invalid': errors.name,
                                            }"
                                            name="name"
                                            type="text"
                                            class="form-control"
                                            id="name"
                                            v-model="formValue.name"
                                            aria-describedby="nameHelp"
                                            placeholder="Enter full name"
                                        />
                                        <span class="ml-2 invalid-feedback">{{
                                            errors.name
                                        }}</span>
                                    </div>

                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <Field
                                            :class="{
                                                'is-invalid': errors.email,
                                            }"
                                            name="email"
                                            type="email"
                                            class="form-control"
                                            id="email"
                                            v-model="formValue.email"
                                            aria-describedby="nameHelp"
                                            placeholder="Enter full name"
                                        />
                                        <span class="ml-2 invalid-feedback">{{
                                            errors.email
                                        }}</span>
                                    </div>

                                    <div class="form-group">
                                        <label for="email">Password</label>
                                        <Field
                                            :class="{
                                                'is-invalid': errors.password,
                                            }"
                                            name="password"
                                            type="password"
                                            v-model="formValue.password"
                                            class="form-control"
                                            id="password"
                                            aria-describedby="nameHelp"
                                            placeholder="Enter password"
                                        />
                                        <span class="ml-2 invalid-feedback">{{
                                            errors.password
                                        }}</span>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                        @click="editing ? form.resetForm() : ''"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
