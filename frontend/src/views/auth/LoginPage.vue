<script>
    import User from "@/services/user.service"
    import { useLoginStore, useHistory } from "@/stores/useStore"
    export default {
        data() {
            const loginStore = useLoginStore();
            const history = useHistory();
            return {
                account: {
                    email: "",
                    password: "",
                },
                fail: null,
                loginStore,
                history,
            };
        },
        methods: {
            async onSubmit(data) {
                try {
                    this.loginStore.user = await User.login(data);
                    this.loginStore.isLogin = true;
                    if(this.loginStore.user.type === "admin") {
                        this.$router.push("/admin");
                    } else {
                        if(this.history.prevPage !== "") {
                            this.$router.push(this.history.prevPage);
                            this.history.prevPage = "";
                        } else {
                            this.$router.push("/");
                        }
                    }
                } catch (err) {
                    this.fail = err.response.data.message;
                }
            }
        }
    }
</script>

<template>
    <div class="py-5 mb-5 login-register-body">
        <div class="d-flex justify-content-around align-items-center">
            <div class="login-register-tickets">
                <img src="@/assets/images/contact-img.jpg">
            </div>

            <div class="form-login">
                <form @submit.prevent="onSubmit(this.account)" class="px-5 py-4 rounded-4">
                    <h3 class="mb-2 text-center text-dark">
                        Đăng nhập
                    </h3>
                    <div class="form-floating mb-4">
                        <input requiredtype="email" id="email" class="form-control" placeholder="E-mail" v-model="this.account.email">
                        <label for="email">Nhập Email</label>
                    </div>
                    <div class="form-floating mb-4">
                        <input requiredid="pass" type="password" class="form-control"  placeholder="Password" v-model="this.account.password">
                        <label for="pass">Nhập mật khẩu</label>
                    </div>
                    <div class="mb-4">
                        <span class="mb-1 text-warning" v-if="this.fail != null">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            {{this.fail}}
                        </span>
                        <button type="submit" class="btn btn-lg btn-danger w-100">Đăng Nhập</button>
                    </div>
                    <div class="text-center text-dark">
                        <span class="fst-italic fw-light me-2">Bạn chưa có tài khoản?</span>
                        <router-link to="/register" class="fw-bolder">Đăng ký</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
    .form-login {
        border: 1px solid #e0d0d0;
        border-radius: 5px;
        width: 30%;
        height: auto;
        background-color: #f8f8f8;
    }
    .login-register-body{
        background-color: #3d7879;
    }
    .login-register-tickets img {
        height: 304px;
        width: 100%;
    }
</style>