<script>
    import { useLoginStore } from "@/stores/useStore";
    import TourService from '@/services/tour.service';

    export default {
        data() {
            const loginStore = useLoginStore();
            return {
                loginStore,
                tours: [],
                data: {},
                imageInput: '',
            };
        },
        methods: {
            async getData() {
                this.tours = await TourService.getAll();
                this.tours = this.tours.reverse();
            },
            changeImage(e) {
                const fileName = e.target.files[0];
                this.imageInput = fileName;
            },
            async handleUpdate () {
                if(confirm("Bạn chắc chắn muốn cập nhật?")) {
                    try { 
                        if (this.imageInput.name != null) {
                            this.data.avt = this.imageInput.name
                        }
                        await TourService.update(this.data._id, {...this.data});
                        this.getData();
                        this.$toast.success('Cập nhật thành công',
                            {
                                position: "top-right",
                                duration: 3000,
                            }
                        );
                        this.data = {}
                    } catch (err) {
                        this.$toast.error('Cập nhật thất bại.',
                            {
                                position: "top-right",
                                duration: 3000,
                            }
                        );
                    }
                }
            },
            async handleAdd() {
                try {
                    this.data.avt = this.imageInput.name
                    await TourService.create({...this.data});
                    this.getData();
                    this.$toast.success('Thêm mới thành công',
                        {
                            position: "top-right",
                            duration: 3000,
                        }
                    );
                    this.data = {}
                } catch (err) {
                    this.$toast.error('Thêm mới thất bại.',
                        {
                            position: "top-right",
                            duration: 3000,
                        }
                    );
                }

            },
            async handleDelete(id) {
                if(confirm("Bạn chắc chắn muốn xóa này?")) {
                    await TourService.delete(id);
                    this.$toast.success('Xóa Tour thành công',
                        {
                            position: "top-right",
                            duration: 3000,
                        }
                    );
                    this.getData();
                }
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
    <div>
        <div class="align-items-center mb-2">
            <div>
                <button class="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#add-edit-tour">
                    Thêm tuyến đường
                </button>
            </div>
        </div>
        <table class="table table-bordered bg-light">
            <thead>
                <tr class="table-secondary text-center">
                    <th>STT</th>
                    <th>Ảnh xe</th>
                    <th>Tên tuyến đường</th>
                    <th>Số ghế</th>
                    <th>thời gian</th>
                    <th>Giá</th>
                    <th>Khởi hành</th>
                    <th colspan="2" class="col-1">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in this.tours" :key="item._id">
                    <td class="text-center align-middle ">{{i+1}}</td>
                    <td class="text-center align-middle col-2">
                        <img :src="'../src/assets/images/tours/' + item.avt">
                    </td>
                    <td class="align-middle col-2 text-center">
                        <div class="prod-name">{{item.name}}</div>
                    </td>
                    <td class="text-center align-middle col-1">
                        {{item.tourists}}
                    </td>
                    <td class="text-center align-middle col-1">
                        {{item.day}} giờ
                    </td>
                    <td class="text-center align-middle col-2">
                        {{ new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                .format(item.price)
                        }}
                    </td>
                    <td class="text-center align-middle col-2">
                        {{new Date(item.start).toLocaleDateString("vi-VN")}}
                    </td>
                    <td class="text-center align-middle d-flex">
                        <button class="btn text-success fs-4" data-bs-toggle="modal" data-bs-target="#add-edit-tour" @click="this.data = item">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn text-danger fs-4" @click="this.handleDelete(item._id)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="add-edit-tour" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="tour" class="form-label fw-semibold">Tên tuyến</label>
                                <input required type="text" id="tour" class="form-control" placeholder="Tên tuyến" v-model="this.data.name">
                            </div>

                            <div class="mb-3">
                                <label for="price" class="form-label fw-semibold">Giá</label>
                                <input required type="number" min="0" id="price" class="form-control" placeholder="Giá" v-model="this.data.price">
                            </div>

                            <div class="mb-3">
                                <label for="num-cus" class="form-label fw-semibold">Số lượng ghế</label>
                                <input required type="number" id="num-cus" min="1" class="form-control" placeholder="Số lượng ghế" v-model="this.data.tourists">
                            </div>

                            <div class="mb-3">
                                <label for="start" class="form-label fw-semibold">Thời gian</label>
                                <input id="day" type="text" class="form-control" v-model="this.data.day">
                            </div>

                            <div class="mb-3">
                                <label for="start" class="form-label fw-semibold">Ngày khởi hành</label>
                                <input id="start" type="date" class="form-control" v-model="this.data.start">
                            </div>

                            <div class="mb-3">
                                <label for="img" class="form-label fw-semibold">Hình ảnh</label>
                                <input id="img" type="file" class="form-control" @change="this.changeImage">
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Hủy</button>
                            <button v-if="this.data._id != null" type="button" class="btn btn-success" data-bs-dismiss="modal" @click="this.handleUpdate()">
                                Cập nhật
                            </button>

                            <button v-else type="button" class="btn btn-success" data-bs-dismiss="modal" @click="this.handleAdd()">
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .prod-name {
        font-weight: 700;
        line-height: 1.1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    td.text-center.align-middle img {
        width: 100px;
        object-fit: contain;
        height: 100px;
    }
    button.btn.text-success.fs-4 {
        line-height: 86px;
    }
</style>