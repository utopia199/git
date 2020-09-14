<!-- 产品页面 -->
<template>
    <div id='product'>
        产品页面
        <div class="swiper-container">      
         <div class="swiper-wrapper">
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
         </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
export default {
    data() {
        return {
            config:{
                
            }
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
        this.$nextTick(()=>{
            new Swiper('.swiper-container',{
                centeredSlides: true,
                slidesPerView: 2
            })
        })
        
    },
    methods: {
        
    },
}
</script>

<style lang='scss' scoped>
.swiper-slide{
    width: 100%;
    height:200px;
border:1px solid;
}
.swiper-wrapper{
    width: 100%;
    height: 200px;
}
</style>