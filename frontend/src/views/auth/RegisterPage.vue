<script>
    import User from "@/services/user.service"
    export default {
        data() {
            return {
                data: {
                    name: "",
                    email: "",
                    password: "",
                    type: "customer"
                },
                fail: null,
            }
        },
        methods: {
            async onSubmit(data) {
                try {
                    await User.create(data);
                    this.$toast.success('Đăng ký thành công!!!',
                        {
                            position: "top",
                            duration: 1000,
                            pauseOnHover: false,
                        }
                    );
                    setTimeout(() => {
                        this.$toast.clear;
                        this.$router.push('/login')
                    }, 1000)
                } catch(err) {
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
                <form @submit.prevent="onSubmit(this.data)" class="register-form px-5 py-4 rounded-4">
                    <h3 class="mb-2 text-center text-dark">
                        Đăng Ký
                    </h3>
                    <div class="mb-4">
                        <input 
                            required
                            type="text"
                            class="form-control form-control-lg" 
                            placeholder="Họ tên"
                            v-model="this.data.name"
                        >
                    </div>
                    <div class="mb-4">
                        <input 
                            required
                            type="email" 
                            class="form-control form-control-lg" 
                            placeholder="E-mail"
                            v-model="this.data.email"
                        >
                    </div>
                    <div class="mb-4">
                        <input 
                            required
                            type="password" 
                            class="form-control form-control-lg" 
                            placeholder="Mật khẩu"
                            v-model="this.data.password"
                        >
                    </div>
                    <div class="mb-4">
                        <span class="mb-1 text-warning" v-if="this.fail != null">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            {{this.fail}}
                        </span>
                        <button type="submit" class="btn btn-lg btn-danger w-100">Đăng Ký</button>
                    </div>
                    <div class="text-center text-dark">
                        <span class="fst-italic fw-light me-2">Bạn đã có tài khoản?</span>
                        <router-link to="/login" class="fw-bolder">Đăng nhập</router-link>
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