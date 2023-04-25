
<template>
    <div class="text-center py-2 ">
        <router-link to="/admin">
            <img class="img-logo-admin" src="@/assets/images/logo.png" width="150">
        </router-link>
    </div>
    <div class="ms-2 nav flex-column">
        <div class="nav-item border-bottom border-white py-2">
            <router-link to="/admin" class="nav-link text-white fw-semibold">
                <i class="fa-solid fa-house"></i> Tổng quan
            </router-link>
        </div>
        <div class="nav-item border-bottom border-white py-2">
            <router-link to="/admin/product" class="nav-link text-white fw-semibold">
                <i class="fa-solid fa-car"></i> Quản lý tuyến đường
            </router-link>
        </div>
        <div class="nav-item border-bottom border-white py-2">
            <router-link to="/admin/orders" class="nav-link text-white fw-semibold">
                <i class="fa-solid fa-ticket"></i> Quản lý vé đặt
            </router-link>
        </div>
        <div class="nav-item border-bottom border-white py-2">
            <router-link to="/admin/users" class="nav-link text-white fw-semibold">
                <i class="fa-regular fa-user"></i> Quản lý tài khoản
            </router-link>
        </div>
    </div>
</template>

<style>  
    .nav-link[aria-current="page"] {
        color: rgb(211, 218, 0) !important;
    }
    .img-logo-admin{
        border-radius: 10px;
    }
</style>