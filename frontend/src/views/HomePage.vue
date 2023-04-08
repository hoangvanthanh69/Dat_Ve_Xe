<script>

</script>

<template>
    <div class="slider-container position-relative">
        <img src="@/assets/images/contact-img.jpg" class="d-block">
    </div>
    <form class="search-form text-center">
        <div class="container">
            <h2 class="text-light">Nhà xe cam kết 100% giữ vé cho khách</h2>
        </div>
        <div class="container row mt-3">
            <div class="col-3 adrres-users">
                <input type="text" class="form-control" placeholder="Nơi xuất phát">
            </div>
            <div class="col-3">
                <input type="text" class="form-control" placeholder="Nơi Đến">
            </div>
            <div class="col-3">
                <input type="date" class="form-control" placeholder="Ngày đi">
            </div>
            <div class="col-3">
                <a class="btn btn-success search-infor">Tìm chuyến</a>
            </div>
        </div>
    </form>
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

    .search-form .input-group {
        width: 50vw;
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
    }

    .img-logo-book-ticket{
        border-radius: 10px;
    }

    button.search-infor {
        margin-right: 50px;
    }
</style>
