<script>
    import OrderService from '@/services/order.service';
    import { useLoginStore } from "@/stores/useStore";
    export default {
        data() {
            const loginStore = useLoginStore();
            return {
                orders: [],
                loginStore,
            }
        },
        methods: {
            async getData() {
                this.orders = await OrderService.getByUser(this.loginStore.user._id);
                this.orders = this.orders.reverse()
            },
        },
        created() {
            this.getData();
        }
    }
</script>

<template>
    <div class="login-register-order">
        <div class="content container">
            <div class="text-center mb-3">
                <h5 class="fs-4 fw-bold text-light px-2 pt-4">Lịch sử vé</h5>
            </div>
            <table class="table table-bordered bg-light">
                <thead class="">
                    <tr class="table-secondary text-center text-dark">
                        <th>Tuyến đường</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Ngày khởi hành</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-dark" v-for="(item, i) in this.orders">
                        <td class="text-center align-middle fw-semibold">{{item.tourId.name}}</td>
                        <td class="text-center align-middle">
                            {{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                .format(item.total)
                            }}
                        </td>
                        <td class="align-middle text-center">
                            {{item.adult}}
                        </td>
                        <td class="text-center align-middle">
                            {{new Date(item.tourId.start).toLocaleDateString("vi-VN")}}
                        </td>
                        <td class="text-center align-middle">
                            {{new Date(Date.parse(item.createdAt)).toLocaleString()}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
</template>

<style>
    .login-register-order{
        background-color: #3d7879;
    }
</style>