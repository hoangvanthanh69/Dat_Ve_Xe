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
                this.tours = this.tours.reverse();
            },
            sort(cond) {
                if(cond == 1) {
                    this.tours.sort((a, b) => 
                        this.formatDate(a.start) - this.formatDate(b.start)
                    )
                } else if (cond == 2) {
                    this.tours.sort((a, b) => 
                        this.formatDate(b.start) - this.formatDate(a.start)
                    )
                } else if (cond == 3) {
                    this.tours.sort((a, b) => a.price - b.price)
                } else if (cond == 4) {
                    this.tours.sort((a, b) => b.price - a.price)
                } else {}
            },
            formatDate(date) {
                return new Date(date).getTime();
            }
        },
        mounted() {
            this.getData();
        },
    }
</script>

<template>
    <div class="content container mb-4 row">
        <div class="p-2 col-3">
            <div class="fw-bold ps-3 mt-2">Sắp xếp theo:</div>
            <div class="form-check mx-3 ps-5">
                <input type="radio" id="sort2" name="sort" class="form-check-input" @click="sort(1)">
                <label class="form-check-label" for="sort2">Ngày đi gần nhất</label>
            </div>

            <div class="form-check mx-3 ps-5 pt-2">
                <input type="radio" id="sort3" name="sort" class="form-check-input" @click="sort(2)" >
                <label class="form-check-label" for="sort3">Ngày đi xa nhất</label>
            </div>

            <div class="form-check mx-3 ps-5 pt-2">
                <input type="radio" id="sort4" name="sort" class="form-check-input" @click="sort(3)" >
                <label class="form-check-label" for="sort4">Giá tăng dần</label>
            </div>

            <div class="form-check mx-3 ps-5 pt-2">
                <input type="radio" id="sort5" name="sort" class="form-check-input" @click="sort(4)" >
                <label class="form-check-label" for="sort5">Giá giảm dần</label>
            </div>
        </div>

        <div class="row col-9">
            <div v-for="(item, i) in this.tours" :key="i" class="col-3 p-1">
                <div class="card overflow-hidden border-0 h-100">
                    <router-link :to="'/tours/' + item._id">
                        <img :src="'../src/assets/images/tours/' + item.avt" class="card-img-top img-car-tours"/>
                    </router-link>
                    <div class="card-body p-2 d-flex flex-column">
                        <div class="prod-name mt-1 mb-2">{{item.name}}</div>
                        <div><span>Thời gian: </span>{{item.day }} giờ</div>
                        <div>
                            <span>Khởi hành: </span>
                            {{new Date(item.start).toLocaleDateString("vi-VN")}}
                        </div>
                        <div class="prod-price mt-auto">
                            {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                .format(item.price)
                            }}
                        </div>
                        <div class="mt-2">
                            <router-link :to="'/tours/' + item._id" class="btn btn-sm btn-secondary w-100 fs-6">
                                Xem chi tiết
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

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
</style>
