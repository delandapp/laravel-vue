<script setup>
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import $ from "jquery";
import { Form, Field } from "vee-validate";
import * as yup from "yup";

const users = ref([]);
const schema = yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const getUsers = () => {
    axios.get("/api/users").then((response) => {
        users.value = response.data;
    });
};

const createUser = (values, { resetForm }) => {
    // console.log(values);
    axios.post("/api/users", values).then((response) => {
        $("#createUserModal").modal("hide");
        // getUsers();
        // Or
        // users.value.push(response.data);
        // Or
        users.value.unshift(response.data);
        resetForm();
    });
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
                data-toggle="modal"
                data-target="#createUserModal"
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
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade"
                    id="createUserModal"
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
                                    Add New User
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
                                @submit="createUser"
                                :validation-schema="schema"
                                v-slot="{ errors }"
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
