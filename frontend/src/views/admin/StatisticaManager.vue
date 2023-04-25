<script>
    import { useLoginStore } from "@/stores/useStore";
    import TourService from '@/services/tour.service';
    import OrderService from '@/services/order.service';
    import User from "@/services/user.service"
    export default {
        data(){
        const loginStore = useLoginStore();

            return {
                loginStore,
                tours: [],
                orders: [],
                users: [],
            };
        },
        methods: {
            async getData() {
                this.tours = await TourService.getAll();
                this.tours = this.tours.reverse();
                this.orders = await OrderService.getAll();
                this.orders = this.orders.reverse();
                this.users = await User.getAll();
                this.users = this.users.reverse();
            },
        },
        computed: {
            totalTours() {
                return this.tours.length;
            },
            totalorder() {
                return this.orders.length;
            },
            totaluser() {
                return this.users.length;
            },
            totalOrder() {
                return this.orders.reduce((total, order) => total + order.total, 0);
            },
            totalTourFull() {

            }
        },
        beforeMount() {
            if(this.loginStore.isLogin === false && this.loginStore.user.type !== "admin") 
                this.$router.push("/login")
        },
        created() {
            this.getData();
        },
    };
</script>

<template>
    <div class="container px-4 py-5">
        <div class="row gx-5">
            <div class="col-4 mb-4 text-light">
                <div class="card h-100 bg-danger">
                    <div class="row no-gutters">
                        <div class="col-10 p-4">
                            <div class="fw-bold pb-2">Tổng số Tour</div>
                            <div class="h5 fw-bold text-result">{{ totalTours }} Tour</div>
                            <router-link to="/admin/product" class="nav-link">Xem chi tiết</router-link>
                        </div>
                        <div class="col-2 pt-4">
                            <i class="fa-sharp fa-solid fa-wallet fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-4 mb-4 text-warning">
                <div class="card h-100 bg-success">
                    <div class="row no-gutters">
                        <div class="col-10 p-4">
                            <div class="fw-bold pb-2">Tổng số Đơn</div>
                            <div class="h5 fw-bold text-result">{{ totalorder }} Đơn</div>
                            <p>Giá trị {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(totalOrder)}}</p>
                            <router-link to="/admin/orders" class="nav-link">Xem chi tiết</router-link>
                        </div>
                        <div class="col-2 pt-4">
                            <i class="fas fa-calendar-check fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-4 mb-4 text-secondary">
                <div class="card h-100 bg-warning">
                    <div class="row no-gutters">
                        <div class="col-10 p-4">
                            <div class="fw-bold pb-2">Tổng số Khách Hàng</div>
                            <div class="h5 fw-bold text-result">{{ totaluser }} Khách Hàng</div>
                            <router-link to="/admin/users" class="nav-link">Xem chi tiết</router-link>
                        </div>
                        <div class="col-2 pt-4">
                            <i class="fas fa-database fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>