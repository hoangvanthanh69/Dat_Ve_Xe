<script>
    import User from "@/services/user.service"
    export default {
        data() {
            return {
                users: [],
                data: {},
            }
        },
        methods: {
            async getData() {
                this.users = await User.getAll();
                this.users = this.users.reverse();
            },
            async handleUpdate() {
                try {
                    if(confirm("Bạn chắc chắn muốn cập nhật?")) {
                        const oldData = await User.get(this.data._id)
                        if(this.data.email === oldData.email) {
                            delete this.data.email;
                        }
                        await User.update(this.data._id, this.data);
                        this.$toast.success('Cập nhật thành công!',
                            {
                                position: "top",
                                duration: 3000,
                            }
                        );
                        this.data = {}
                        this.getData();
                    }
                } catch (err) {
                    this.$toast.error('Cập nhật thất bại!',
                        {
                            position: "top",
                            duration: 3000,
                        }
                    );
                }
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<template>
    <div>
        <h5 class="fw-bold my-3">Quản lý Người Dùng</h5>
        <table class="table table-bordered bg-light">
            <thead>
                <tr class="table-secondary text-center">
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Loại tài khoản</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in this.users">
                    <td class="text-center align-middle">{{i + 1}}</td>
                    <td class="text-center align-middle">{{item.name}}</td>
                    <td class="text-center align-middle">{{item.email}}</td>
                    <td class="text-center align-middle">{{item.phone}}</td>
                    <td class="text-center align-middle">{{(item.type === 'admin') ? "Quản trị viên" : "Khách hàng"}}</td>
                    <td class="text-center align-middle">
                        <button class="btn text-success fs-4" data-bs-toggle="modal" data-bs-target="#edit-user" @click="this.data = item">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="edit-user" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title fs-5 fw-bold">Chỉnh sửa tài khoản</div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="hoten" class="form-label fw-semibold">Họ tên</label>
                            <input type="text" id="hoten" class="form-control" placeholder="Họ tên" v-model="this.data.name">
                        </div>

                        <div class="mb-3">
                            <label for="sdt" class="form-label fw-semibold">Số điện thoại</label>
                            <input type="text" id="sdt" class="form-control" placeholder="Số điện thoại" v-model="this.data.phone">
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label fw-semibold">E-mail</label>
                            <input type="email" id="email" class="form-control" placeholder="E-mail" v-model="this.data.email">
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label fw-semibold">Mật khẩu</label>
                            <input type="password" id="password" class="form-control" placeholder="Mật khẩu" v-model="this.data.password">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="this.handleUpdate()">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>