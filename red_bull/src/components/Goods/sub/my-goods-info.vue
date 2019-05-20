<template>
	<div class="goods-info-main-box" >
		<img v-for="(item,i) in goods_desc" :key="item" v-lazy="item" @click="imgPreview(goods_desc,i)">
	</div>
</template>

<script>
    import { ImagePreview } from 'vant';
    export default {
        data() {
            return {};
        },
        props:["goods_desc"],
        created() {

        },
        methods: {

        imgPreview(img_url,i){
            ImagePreview({
                images:img_url,
                lazyLoad:true,
                startPosition:i
            });
        }
				},
    };
</script>

<style lang="scss">
		.goods-info-main-box{
			img{
				display: block;
				width: 100%;
			}
		}
</style>