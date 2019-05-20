<template>
	<div class="main">
		<div class="pay-info-box">
			<swiper class="coupon_swiper" :options="pay_info_swiper">
				<swiper-slide v-for="(item,i) in pay_info" :key="i">
					<div class="pay-info-one">
						<div class="pay-info-one-t"><em>￥</em>{{item.pay_info_price}}</div>
						<div class="pay-info-one-b">{{item.pay_info_name}}</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                pay_info_swiper: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                    //autoplay:true,
                },
                pay_info: []
            };
        },
        props: ["pay_list"],
        computed: {
            goods_info: {
                get: function () {
                    return this.$store.getters.getGoodsInfo
                }
            },
        },
        watch: {
            'goods_info': function (newVal) {
                this.updPayInfo(newVal);
            }
        },
        created() {

        },
        methods: {
            updPayInfo(newVal) {
                this.pay_info = [];
                this.pay_list.forEach((item) => {
                    item.ByStages.forEach((item2, i) => {
                        let var_name = 'data_' + i;
                        window[var_name] = [];
                        if (parseInt(item2.bystages_fee) < 1) {
                            window[var_name].pay_info_name = item.pay_name + '享' + parseFloat(item2.bystages_fee) * 100 + '折'
                        } else {
                            window[var_name].pay_info_name = item.pay_name
                        }
                        if (parseInt(item2.bystages_stage) > 0) {
                            window[var_name].pay_info_price = ((parseFloat(newVal.goods_price) * parseFloat(item2.bystages_fee)) / parseInt(item2.bystages_stage)).toFixed(2) + '×' + parseInt(item2.bystages_stage) + '期';
                        } else {
                            window[var_name].pay_info_price = (parseFloat(newVal.goods_price) * parseFloat(item2.bystages_fee)).toFixed(2) + '不分期';
                        }
                        window[var_name].bystages_stage = parseInt(item2.bystages_stage);
                        this.pay_info.push(window[var_name]);
                    });
                });
                let tmpArr = [];
                //筛选条件
                this.pay_info.forEach((item, i) => {
                    if (parseInt(item.bystages_stage) > 0 && parseFloat(newVal.goods_price) <= 50) {
                        tmpArr.unshift(i);
                    }
                });
                tmpArr.forEach(item => {
                    this.pay_info.splice(item, 1);
                })
            }
        },
    };
</script>

<style lang="scss" scoped>
	.pay-info-box {
		margin-top: 5px;
		height: 70px;

		.swiper-container {
			z-index: 0 !important;
		}

		.pay-info-one {
			overflow: hidden;
			margin-top: 5px;
			margin-bottom: 5px;
			width: 100px;
			height: 50px;
			background-color: white;
			border-radius: 5px;
			box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.3);

			.pay-info-one-t {
				width: 100%;
				height: 30px;
				line-height: 40px;
				text-align: center;
				font-weight: bold;
				color: red;
				background-color: #c8c9cc;
				font-size: 12px;

				em {
					font-style: normal;
					font-size: 6px;
				}
			}

			.pay-info-one-b {
				width: 100%;
				height: 20px;
				line-height: 20px;
				text-align: center;
				font-weight: bold;
				color: rgb(100, 100, 100);
				font-size: 10px;
			}
		}
	}
</style>