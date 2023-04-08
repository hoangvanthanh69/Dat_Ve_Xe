<script>
    import OrderService from '@/services/order.service';
    export default {
        data() {
            return {
                orders: [],
            }
        },
        methods: {
            async getData() {
                this.orders = await OrderService.getAll();
                this.orders = this.orders.reverse()
            },
        },
        created() {
            this.getData();
        }
    }
</script>

<template>
    <div>
        <h5 class="fw-bold my-3">Quản lý tuyến đường</h5>  
        <table class="table table-bordered bg-light">
            <thead>
                <tr class="table-secondary text-center">
                    <th>Khách hàng</th>
                    <th>Tuyến đường</th>
                    <th>Số lượng</th>
                    <th>Thời gian</th>
                    <th>Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in this.orders" :key="item._id">
                    <td class="align-middle col-3">
                        <div class="fw-bold p-2 text-success">{{item.name}}</div>
                        <div class="p-2"><i class="fa-solid fa-phone text-danger"></i> {{item.phone}}</div>
                        <div class="p-2"><i class="fa-solid fa-location-dot text-primary"></i> {{item.address}}</div>
                    </td>

                    <td class="align-middle col-4">
                        <div class="fw-bold prod-name p-2 text-success">{{item.tourId.name}}</div>
                        <div class="p-2">Ngày khởi hành: {{item.tourId.start}}</div>
                        <div class="p-2">Thời gian: {{item.tourId.day}} giờ</div>
                    </td>

                    <td class="align-middle text-center col-1">{{item.adult > 0 ? item.adult : 0}}</td>

                    <td class="text-center align-middle col-2">
                        {{new Date(Date.parse(item.createdAt)).toLocaleString()}}
                    </td>
                    
                    <td class="text-center align-middle col-2 text-danger">
                        {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                            .format(item.total)
                        }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
    .prod-name {
        font-weight: 700;
        line-height: 1.1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>                  