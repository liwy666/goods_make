<template>
	<router-link tag="div" class="goods" :to="'/goods/'+goods_info.goods_id">
		<div class="goods-img"><img v-lazy="goods_info.goods_img"></div>
		<div class="goods-name">
			<van-tag type="danger">自营</van-tag>
			{{goods_info.goods_name}}
		</div>
		<div class="goods-tag">
			<van-tag plain type="danger" v-if="parseFloat(goods_info.shop_price ) > 50">免息分期</van-tag>
			<van-tag plain type="danger">岗隆专享</van-tag>
		</div>
		<div class="goods-price" v-if="parseFloat(goods_info.shop_price ) > 50">{{goods_info.shop_price}}元</div>
		<div class="goods-stages" v-if="parseFloat(goods_info.shop_price ) > 50"><i>{{goods_info.goods_stages}}</i>元×24期起</div>
		<div class="goods-price" v-if="parseFloat(goods_info.shop_price ) <= 50">原价：{{goods_info.market_price}}元</div>
		<div class="goods-stages" v-if="parseFloat(goods_info.shop_price ) <= 50"><i>现价{{goods_info.shop_price}}</i>元</div>
	</router-link>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["goods_info_"],
        computed: {
            goods_info: {
                get: function () {
                    let result = {};
                    result.goods_id = this.goods_info_.goods_id;
                    result.goods_name = this.goods_info_.goods_name;
                    result.goods_img = this.goods_info_.goods_img;
                    result.shop_price = this.goods_info_.shop_price;
                    result.market_price = this.goods_info_.market_price;
                    result.goods_stages = (this.goods_info_.shop_price / 24).toFixed(2);
                    return result;
                }
            }
        },
        created() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>
	.goods {
		width: 45%;
		margin-left: 3.33%;
		background-color: white;
		margin-top: 8px;
		margin-bottom: 8px;
		border-radius: 5px;
		overflow: hidden;
		
		.goods-img {
			margin-top: 5px;
			width: 100%;
			
			img {
				width: 100%;
			}
		}
		
		.goods-name {
			//white-space: pre-wrap;
			border: 0px solid black;
			position: relative;
			box-sizing: border-box;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			flex-direction: column;
			align-content: flex-start;
			flex-shrink: 0;
			font-size: 12px;
			text-align: left;
			line-height: 19.872px;
			height: 39.744px;
			margin-top: 2.208px;
			margin-bottom: 2.208px;
			color: rgb(62, 62, 62);
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		
		.goods-price {
			white-space: pre-wrap;
			border: 0px solid black;
			position: relative;
			box-sizing: border-box;
			display: block;
			-webkit-box-orient: vertical;
			flex-direction: column;
			align-content: flex-start;
			flex-shrink: 0;
			font-size: 12px;
			text-align: left;
			font-weight: 600;
			color: rgb(255, 0, 0);
			line-height: 30.912px;
			margin-left: 5px;
		}
		
		.goods-stages {
			background: url("./../../assets/goods-stages.jpg") no-repeat;
			background-size: 100% 100%;
			height: 40px;
			line-height: 40px;
			font-weight: bold;
			color: white;
			font-size: 10px;
			padding-left: 8px;
			
			i {
				font-style: normal;
				font-size: 24px;
			}
		}
	}
</style>