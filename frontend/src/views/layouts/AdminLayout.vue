<script>
    import AdminHeader from "@/components/AdminHeader.vue";
    import AdminSideBar from "@/components/AdminSideBar.vue";

    export default {
        components: {
            AdminHeader,
            AdminSideBar,
        },

    };
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 px-0 admin-side">
                <AdminSideBar />
            </div>
            <div class="col-10 offset-2 admin-main-manager">
                <AdminHeader />
                <router-view />
            </div>
        </div>
    </div>
</template>

<style>
    .admin-side{
        background-color: #064352;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
    }
    .admin-main-manager{
        min-height: 725px;
        background-color: rgb(232 232 232);;
    }
</style>