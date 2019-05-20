<template>
	<div class="main">
		<div class="goods-sku-box">
			<div class="goods-sku-top">
				<div class="goods-attribute-img"><img @click="oneImgPreview(goods_info.goods_attribute_img)"
													  :src="goods_info.goods_attribute_img" alt=""></div>
				<div class="goods_price_sn">
					<p class="goods_price"><span>￥</span>{{this.goods_info.goods_price}}
					<p/>
					<p class="goods_sn">商品编号：{{this.goods_info.goods_sn}}
					<p class="goods_sn">库存：{{this.goods_info.goods_stock}}
					<p/>
				</div>
			</div>
			<div class="goods-sku-body">
				<div class="goods-sku-row" v-for="(item,i) in goods_sku" :key="i">
					<p class="goods-sku-row-title">{{item.attribute_name}}</p>
					<div class="goods-sku-row-item-box">
						<span :class="['goods-sku-row-item',item2.xz_flag ? 'xz':'']"
							  v-for="(item2,i2) in item.attribute_value"
							  :key="i2" @click="replAttr(i,i2)">{{item2.name}}</span>
					</div>
				</div>
			</div>
			<div class="goods-number">
				<van-row>
					<van-col span="12">数量</van-col>
					<van-col span="12">
						<van-stepper v-model="goods_number" integer :max="1"
									 @change="updGoodsNumber"/>
					</van-col>
				</van-row>
			</div>
			<div class="address-box">
				<van-field
					v-model="make_name"
					label="预约人姓名"
					placeholder="请输入预约人姓名"
					required
				/>
				<van-field
					v-model="make_phone"
					label="预约人电话"
					placeholder="请输入预约人电话"
					required
					onkeyup="value=value.replace(/[^\d]/g,'')"
				/>
			</div>
			<div class="button-box">
				<!--	<van-button block type="warning" @click="addCart(goods_info)">加入购物车</van-button>-->
				<van-button block type="danger" @click="make" :disabled="goods_info.goods_stock > 0 ? false : true">
					{{this.make_button_info}}
				</van-button>
			</div>
		</div>
	</div>
</template>

<script>
    import {ImagePreview} from 'vant';
    //import areaList from './area'
    export default {
        data() {
            return {
                goods_number: 1,
                make_name: '',
                make_phone: '',
            };
        },
        computed: {
            goods_sku: {
                get: function () {
                    return this.$store.getters.getGoodsSku
                }
            },
            goods_info: {
                get: function () {

                    return this.$store.getters.getGoodsInfo

                }
            },
            make_button_info: {
                get: function () {
                    if (this.goods_info.goods_stock > 0) {
                        return '立即预约';
                    } else {
                        return '已售罄';
                    }
                }

            }
        },
        created() {

        },
        methods: {
            replAttr(key1, key2) {
                let key = {key1: key1, key2: key2};
                this.$store.commit("updGoodsSkuAttr", key);
            },
            updGoodsNumber(number) {
                this.$store.commit("updGoodsSkuNumber", number);
            }
            , oneImgPreview(img_url) {
                ImagePreview({
                    images: [img_url],
                    lazyLoad: true,
                });
            }
            , addCart(goods_info) {
                this.$store.commit('addCart', goods_info);
                this.showSku();
            }
            , nowPay(goods_info) {
                //     清空已选中列表
                this.$set(this.$store.state, 'carts_selected', []);
                //    把选中开关全部关闭
                this.$store.state.carts.forEach(item => {
                    item.selected = false;
                });
                //    添加当前商品到购物车
                this.$store.commit('addCart', goods_info);
                //更新购物车数量
                this.$store.commit("updCartNumber", goods_info);
                //打开此件商品开关
                this.$store.commit("openCartSelected", goods_info);
                //    跳转提交页面
                this.$router.push('/writeOrder');
            }
            , showSku() {
                this.$emit('updShowSku', false);
            }
            , make() {
                let check_flag = true;
                if (this.isName(this.make_name)) {
                    this.$toast('预约人姓名填写错误');
                    check_flag = false;
                    return false;
                }
                if (this.isPhone(this.make_phone)) {
                    this.$toast('预约人电话填写错误');
                    check_flag = false;
                    return false;
                }
                if (check_flag) {
                    let post_info = this.goods_info;
                    post_info.into_type = this.$store.state.into_type;
                    post_info.make_name = this.make_name;
                    post_info.make_phone = this.make_phone;
                    let toast1 = this.$toast.loading({
                        mask: true,
                        message: '提交中',
                        duration: 0
                    });
                    this.$post('add_make_order', post_info)
                        .then((msg) => {
                            toast1.clear();
                            if (msg) {
                                this.$dialog.alert({
                                    message: '恭喜您已成功预约，我们将提前备货，请于2019年5月21日至2019年5月22日到专享现场试机并付款提货！'
                                }).then(() => {
                                });
                            }
                        })
                }
            },
            /*姓名验证*/
            isName(str) {
                let regName = /^[\u4e00-\u9fa5]{2,4}$/;
                return !regName.test(str);
            },

            /*电话验证*/
            isPhone(str) {
                let mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                return !mobileRegex.test(str);
            }

        },
    };
</script>

<style lang="scss" scoped>
	.goods-sku-box {
		.goods-sku-top {
			width: 96%;
			margin-left: 2%;
			display: flex;
			align-items: flex-end;

			.goods-attribute-img {
				flex: 1;

				img {
					width: 100%;
				}
			}

			.goods_price_sn {
				margin-left: 30px;
				margin-bottom: 10px;
				flex: 2;

				.goods_price {
					color: red;
					font-size: 24px;
					font-weight: bold;

					span {
						font-size: 16px;
					}
				}

				.goods_sn {
					font-size: 10px;
				}
			}
		}

		.goods-sku-body {
			width: 96%;
			margin-left: 2%;
			height: 250px;
			overflow-y: auto;

			.goods-sku-row-title {
				font-size: 14px;
				margin-top: 20px;
			}

			.goods-sku-row-item-box {
				display: flex;
				flex-wrap: wrap;
				/*margin-bottom: 20px;*/
				.goods-sku-row-item {
					height: 28px;
					line-height: 28px;
					font-size: 14px;
					margin-top: 5px;
					border-radius: 50px;
					margin-left: 20px;
					justify-content: flex-start;
					background-color: rgba(0, 0, 0, .1);
					padding-left: 20px;
					padding-right: 20px;
					box-sizing: border-box;
					border: 1PX solid rgba(0, 0, 0, 0);
					transition: all ease 0.3s;
				}

				.xz {
					$main-color0: #cc0001;
					$main-color1: rgba(251, 0, 0, 0.1);
					$main-color2: rgb(238, 175, 61);
					$main-color4: rgba(251, 0, 0, 0.6);
					$main-color5: rgba(251, 0, 0, 0.7);
					border: 1PX solid $main-color0;
					background-color: $main-color1;
					color: $main-color0;
				}
			}
		}

		.goods-number {
		}

		.address-box {
			margin-bottom: 10px;
			padding-left: 5px;
		}

		.button-box {
			display: flex;
		}
	}
</style>