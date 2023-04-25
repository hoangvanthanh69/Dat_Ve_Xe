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
        <h5 class="fw-bold my-3">Quản lý đặt vé</h5>  
        <table class="table table-bordered bg-light">
            <thead>
                <tr class="table-secondary text-center">
                    <th>STT</th>
                    <th>Khách hàng</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Thời gian Đặt</th>
                    <th>Tuyến đường</th>
                    <th>Giờ khởi hành</th>
                    <th>Ngày khởi hành</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in this.orders" :key="item._id" class="text-center">
                    <td class="">{{ i+1 }}</td>
                    <td class="align-middle text-success col-2">
                        {{item.name}}
                    </td>
                    <td class="align-middle col-1">
                        {{item.phone}}
                    </td>
                    <td class="align-middle col-3">
                        {{item.address}}
                    </td>
                    <td class="text-center align-middle col-2">
                        {{new Date(Date.parse(item.createdAt)).toLocaleString()}}
                    </td>
                    <td class="align-middle text-success col-2">
                        {{item.tourId.name}}
                    </td>
                    <td class="col-1">
                        {{item.tourId.day}} giờ
                    </td>
                    <td class="col-2">
                       {{item.tourId.start}}
                    </td>
                    <td class="align-middle text-center ">
                        {{item.adult > 0 ? item.adult : 0}}
                    </td>
                    <td class="text-center align-middle text-danger">
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