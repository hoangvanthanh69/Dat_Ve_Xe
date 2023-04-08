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
        },
    };
</script>
<template>
    <div class="d-flex justify-content-end align-items-center">
        <div class="d-flex">
            <div class="text-start mt-2">
                <span class="fw-bold">{{this.loginStore.user.name}}</span>
            </div>
            <button class="btn text-start text-danger" @click="onLogout">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </div>
    </div>
</template>
<style>
</style>