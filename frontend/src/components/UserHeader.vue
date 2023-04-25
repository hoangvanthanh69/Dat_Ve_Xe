<script>
    import { useLoginStore } from "@/stores/useStore";
    export default {
        data() {
            const loginStore = useLoginStore();
            return {
                loginStore,
            };
        },
        methods: {
            async onLogout() {
                this.loginStore.user = {};
                this.loginStore.isLogin = false;
                this.$router.push("/login")
            }
        }
    };
</script>

<template>
    <header class="header bg-user-home">
        <div class="container py-1 ">
            <div class="d-flex justify-content-around align-items-center">
                <router-link to="/">
                    <img class="img-logo-book-ticket" src="@/assets/images/logo.png" height="60"/>
                </router-link>
                <nav class="d-flex nav">
                    <router-link to="/" class="mx-3 fs-5 fw-bold nav-link">
                        Trang chủ
                    </router-link>
                    <router-link to="/tours" class="mx-3 fs-5 fw-bold nav-link">
                        Các tuyến
                    </router-link>
                    <router-link to="/contact" class="mx-3 fs-5 fw-bold nav-link">
                        Giới thiệu
                    </router-link>
                    <router-link to="/login" v-if="loginStore.isLogin === false" class="mx-3 fs-5 fw-bold nav-link">
                        Đăng nhập
                    </router-link>
                    <a class="mx-3 fs-5 fw-bold nav-link" href="tel:0837641469">
                        Hotline
                    </a>
                    <router-link to="/my-tour" v-if="loginStore.isLogin === true" class="mx-3 fs-5 fw-bold nav-link">
                        Lịch sử
                    </router-link>
                    <span @click="onLogout" v-if="loginStore.isLogin === true"  class="ms-3 fw-bold nav-link" style="cursor: pointer;">
                        <span class="fw-bold pe-2 text-danger">{{this.loginStore.user.name}}</span>
                        <i class="fa-solid fa-right-from-bracket text-success"></i>
                    </span>
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped>
    .header {
        background-color: rgba(210, 177, 177, 0.3);
        backdrop-filter: blur(10px);
    }

    .nav * {
        font-size: 17px;
    }

    .nav-link {
        color: black;
    }

    .nav-link[aria-current="page"] {
        color: rgb(43, 0, 255);
    }

    img.img-logo-book-ticket {
        border-radius: 10px;
    }
</style>