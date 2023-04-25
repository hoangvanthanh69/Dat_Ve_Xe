<script>
    import TourService from '@/services/tour.service';
    export default {
        data() {
            return {
                tours: [],
                filter: ''
            }
        },
        methods: {
            async getData() {
                this.tours = await TourService.getAll();
            },
        },
        computed: {
            filteredTours() {
                return this.tours.filter(tour => tour.name.toLowerCase().includes(this.filter.toLowerCase()));
            }
        },
        mounted() {
            this.getData();
        },
    }
</script>

<template>
    <div class="slider-container position-relative">
        <img src="@/assets/images/contact-img.jpg" class="d-block">
    </div>
    
    <form class="search-form text-center">
        <div class="container">
            <h2 class="text-light">Nhà xe cam kết 100% giữ vé cho khách</h2>
        </div>
        <div class="input-group input-group-lg p-3 rounded-4">
            <input type="text" class="form-control" placeholder="Tìm kiếm..." v-model="filter">
        </div>
    </form>
    <div class="container mb-4">
        <div class="row g-3 mt-1" v-if="filter != 0">
            <div v-for="tour in filteredTours" :key="tour.id" class="col-3 p-1" v-if="filteredTours != 0">
                <div class="card overflow-hidden border-0 h-100">
                    <router-link :to="'/tours/' + tour._id">
                        <img :src="'../src/assets/images/tours/' + tour.avt" class="card-img-top"/>
                    </router-link>
                    <div class="card-body p-2 d-flex flex-column">
                        <div class="prod-name mt-1 mb-2">{{tour.name}}</div>
                        <div><span>Thời gian: </span>{{tour.day }}</div>
                        <div>
                            <span>Khởi hành: </span>
                            {{new Date(tour.start).toLocaleDateString("vi-VN")}}
                        </div>
                        <div class="prod-price mt-auto">
                            {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                .format(tour.price)
                            }}
                        </div>
                        <div class="mt-2">
                            <router-link :to="'/tours/' + tour._id" class="btn btn-warning btn-sm w-100 fs-6">
                                Xem chi tiết
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center" v-else="filteredTours == 0">
                <p class="fw-bold fs-4 text-danger">
                    Không tìm thấy!
                </p> 
            </div>
        </div>
    </div>
</template>

<style scoped>
    .slider-container img {
        width: 100vw;
        height: 25vw;
    }

    .slider-container::after {
        content: "";
        top: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(#00000059 , #00000099);
        position: absolute;
        z-index: 2;
    }

    .search-form {
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
    }
    .card:hover {
        box-shadow: 0 2px 4px 0 #0e1e2533, 0 2px 16px 0 #0e1e2599;
    }
    .prod-name {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .prod-price {
        font-size: 19px;
        font-weight: 700;
        color: red;
    }
    img.img-car-tours {
        height: 160px;
        padding-top: 14px;
        object-fit: contain;
    }
    img.card-img-top {
        height: 160px;
        padding-top: 14px;
        object-fit: contain;
    }
    
</style>
