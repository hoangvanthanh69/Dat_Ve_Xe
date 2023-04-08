<script>
</script>
<template>
    <div class="slider-container position-relative">
        <img src="@/assets/images/contact-img.jpg" class="d-block">
    </div>
    <div class="container contact-book-tickets">
        <h5 class="text-light">Đặt vé xe online nhanh chóng tiện lợi</h5>
        <h5 class="text-light">Chúng tôi luôn đồng hành cùng bạn khắp nẻo đường</h5>
        <h5 class="text-light">Đổi ngũ nhân viên chuyên nghiệp, tận tình phục vụ hết lòng vì bạn</h5>
        <h5 class="text-light">Luôn đưa uy tình và chất lượng lên hàng đầu</h5>
        <h5 class="text-light">Chúng tôi luôn đổi mới và nâng cao chất lượng dịch vụ của mình</h5>
        <h5 class="text-light">Hãy sử dụng dịch vụ đặt vé xe online của chúng tôi để trải nghiệm dịch vụ và chất lượng tốt nhất!</h5>

    </div>
    
</template>
<style>
    .slider-container img {
        width: 100vw;
        height: 30vw;
        object-fit: contain;
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
    .contact-book-tickets {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
    }
</style>
