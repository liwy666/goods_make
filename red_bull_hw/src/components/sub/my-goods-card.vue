<template>
	<div class="goods" @click="$router.push({ path: 'goods/'+goods_info.goods_id, query: { goods_info: JSON.stringify(goods_info_) }})">
		<div class="goods-img"><img v-lazy="goods_info.goods_img"></div>
		<div class="goods-name">
			<van-tag type="danger" v-if="goods_info.goods_head_name!==''&&goods_info.goods_head_name!==null">{{this.goods_info.goods_head_name}}</van-tag>
			{{goods_info.goods_name}}
		</div>
		<div class="goods-tag-box">
			<van-tag plain type="danger" v-for="(item,i) in goods_tag" :key="i">{{item}}</van-tag>
		</div>
		<div class="price-box">
			<div class="market_price">市场价:￥{{goods_info.market_price}}</div>
			<div class="shop_price">专享价:￥{{goods_info.shop_price}}</div>
		</div>
	</div>
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
                    result.goods_head_name = this.goods_info_.goods_head_name;
                    result.goods_img = this.goods_info_.goods_img;
                    result.shop_price = this.goods_info_.shop_price;
                    result.market_price = this.goods_info_.market_price;
                    result.keywords = this.goods_info_.keywords;
                    result.goods_stages = (this.goods_info_.shop_price / 24).toFixed(2);
                    return result;
                }
            }
            /*商品关键词*/
            ,goods_tag:{
                get:function () {
					let result = [];
					if(this.goods_info.keywords !== ''){
                        result = this.goods_info.keywords.split('|');
					}
					return result
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
		box-shadow: 0 0 5px 1px rgba(0,0,0,.2);
		.goods-img {
			width: 100%;
			height: 169px;
			overflow: hidden;
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
			font-size: 11px;
			text-align: left;
			line-height: 19.872px;
			height: 45px;
			margin-top: 2.208px;
			margin-bottom: 2.208px;
			color: rgb(62, 62, 62);
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.goods-tag-box{
			.van-tag{
				margin-left: 5px;
			}
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
		.price-box{
			margin-top: 5px;
			margin-bottom: 10px;
			padding-left: 12px;
			.market_price{
				text-decoration:line-through;
				color: darkgrey;
				font-size: 10px;
			}
			.shop_price{
				color: red;
				font-size: 12px;
				font-weight: bold;
			}
		}
		.goods-stages {
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