<script>
    import TourService from '@/services/tour.service';
    import OrderService from '@/services/order.service';
    import { useLoginStore, useHistory } from "@/stores/useStore";
    export default {
        data() {
            const loginStore = useLoginStore();
            const history = useHistory();
            return {
                tour: {},
                loginStore,
                dataOrder: {},
                history,
            }
        },
        methods: {
            async getData() {
                this.tour = await TourService.get(this.$route.params.id);
                this.dataOrder.name = this.loginStore.user.name
                this.dataOrder.email = this.loginStore.user.email
                this.dataOrder.phone = this.loginStore.user.phone
            },
            async handleSubmit() {
                try {
                    await OrderService.create({
                        ...this.dataOrder,
                        useId: this.loginStore.user._id,
                        tourId: this.tour._id,
                        total: (this.tour.price * this.dataOrder.adult),
                    })
                    this.dataOrder = {};
                    this.$toast.success('Đặt tour thành công! \nChúng tôi sẽ sớm liên hệ với bạn.',
                        {
                            position: "top",
                            duration: 5000,
                        }
                    );
                } catch (err) {
                    this.$toast.error('Đặt tour không thành công!',{
                        position: "top",duration: 3000,
                    }
                    );
                }
            },
            handleNavigate() {
                this.history.prevPage = this.$route.path
                this.$router.push("/login")
            }
        },
        created() {
            this.getData()
        }
    }

</script>

<template>
    <div class="bg-tour-detail-user p-1">
        <div class="content container mb-4" v-if="this.tour._id != null">
            <div class="row mb-5">
                <div class="col-7">
                    <img :src="'../src/assets/images/tours/' + this.tour.avt" class="img-detail-touts rounded-4"/>
                </div>
                <div class="col-5 d-flex flex-column">
                    <div class="fs-3 tour-name">
                        {{this.tour.name}}
                    </div>

                    <div>
                        <i class="fa-solid fa-barcode"></i>Mã:
                        <span class="text-uppercase">{{this.tour._id}}</span>
                    </div>

                    <div class="py-3 border-top mt-3">
                        <div class="pb-2">
                            <i class="me-2 fa-regular fa-calendar"></i>Khởi hành:
                            {{new Date(this.tour.start).toLocaleDateString("vi-VN")}}
                        </div>

                        <div class="pb-2"> <i class="me-2 fa-regular fa-clock"></i>Thời gian: {{this.tour.day}} giờ</div>

                        <div> <i class="me-2 fa-solid fa-users-line"></i>Số lượng ghế: {{this.tour.tourists}}</div>
                    </div>

                    <div class="tour-price fw-bold text-danger py-3 border-top">
                        {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                            .format(this.tour.price)
                        }}
                        <span class="fs-5 text-dark fw-normal">/Người</span>
                    </div>

                    <div class="d-flex">
                        <button class="btn btn-lg btn-danger w-50 me-2" data-bs-toggle="modal" data-bs-target="#order" v-if="this.loginStore.isLogin == true"    >
                            Đặt Ngay
                        </button>
                        <button v-else @click="this.handleNavigate()" class="btn btn-lg btn-secondary w-50 me-2" >
                            Đặt Ngay
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="order" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title fs-5 fw-bold">Thông tin khách hàng</div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    
                <div class="modal-body">
                    <div class="mb-3">
                        <input requiredtype="text" class="form-control" placeholder="Họ tên" v-model="this.dataOrder.name">
                    </div>
                    <div class="mb-3">
                        <input requiredtype="email" class="form-control" placeholder="E-mail" v-model="this.dataOrder.email">
                    </div>
                    <div class="mb-3">
                        <input requiredtype="text" class="form-control" placeholder="Số điện thoại" v-model="this.dataOrder.phone">
                    </div>
                    <div class="mb-3">
                        <input required type="text" class="form-control" placeholder="Địa chỉ" v-model="this.dataOrder.address">
                    </div>
                    <div class="mb-3 row">
                        <div>
                            <input required type="number" min="0" class="form-control" placeholder="Số lượng" v-model="this.dataOrder.adult">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirm">Tiếp tục</button>
                </div>
            </div>
        </div>
    </div>

        <div class="modal fade" id="confirm" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title fs-5 fw-bold">Xác nhận đặt vé</div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">Tuyến đường:{{this.tour.name}}</div>
                        <div class="mt-3">Khởi hành: {{this.tour.start}}</div>
                        <div class="mt-3">Thời gian: {{this.tour.day}} giờ</div>
                        <div class="mt-3">Số lượng vé:
                            <span>
                                {{this.dataOrder.adult}} x {{this.tour.price}} = 
                                <b>{{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                .format(this.tour.price * this.dataOrder.adult)}}</b>
                            </span>
                        </div>
                        <div class="mt-3 d-flex justify-content-between align-items-end">
                            <b>Thanh toán:</b>
                            <span class="fw-bolder fs-4 text-warning">
                                {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                    .format((this.tour.price * this.dataOrder.adult))}}
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-between align-items-end">
                        <div>
                            <button type="button" class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#order">Trở lại</button>
                            <button type="button" class="btn btn-danger me-2" data-bs-dismiss="modal" @click="this.handleSubmit()">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
</template>

<style>
    .tour-name {
        font-weight: 800;
        line-height: 1.3;
        color: var(--main-color);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .tour-price {
        font-size: 30px;
    }

    .nav-link {
        color: black;
        font-size: 20px;
        font-weight: 700;
    }

    .nav-link.active {
        color: var(--main-color) !important;
        border-bottom: 3px solid var(--main-color);
    }

    .w-80 {
        width: 80%;
    }
    .img-detail-touts{
        width: 80%;
    }
    .bg-tour-detail-user{
        background-color:#a2bcbc;
    }
    

</style>