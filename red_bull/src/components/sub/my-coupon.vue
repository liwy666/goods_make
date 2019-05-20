<template>
	<div class="main">
		<div class="coupon-box" @click="getCoupon(coupon_info.coupon_id,already_get)">
			<div class="coupon-head">
				<div class="coupon-head-l">
					<div class="coupon-cut-sum">{{this.coupon_info.cut_sum}}<span>元</span></div>
					<p class="coupon-found_sum">满{{this.coupon_info.found_sum}}元</p>
				</div>
				<div class="coupon-head-r">
					<p class="coupon-name">{{this.coupon_info.coupon_name}}</p>
					<p class="coupon-grant-time">有效日期：{{this.coupon_info.start_use_time.substring(0,10)}} - {{this.coupon_info.end_use_time.substring(0,10)}}</p>
				</div>
			</div>
			<p class="coupon-desc">{{this.coupon_info.coupon_desc}}</p>
			<van-progress
				:pivot-text="'已抢:' + already_get + '%'"
				color="#f44"
				:percentage="already_get"
			/>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props:["coupon_info"],
        computed:{
          //已抢优惠券百分比
            already_get:{
                get:function () {
									let get_coupon_number =	parseInt(this.coupon_info.coupon_number)  - parseInt(this.coupon_info.coupon_remainder_number);
									let get_coupon_number_ = (get_coupon_number/parseInt(this.coupon_info.coupon_number)).toFixed(3);
									return parseInt(parseFloat(get_coupon_number_.substring(0,get_coupon_number_.lastIndexOf('.')+3) * 100).toFixed(0));
                }
						}
				},
        created() {
        },
        methods: {
            /*领取优惠券*/
            getCoupon(coupon_id,already_get){
                if(already_get >= 100){
                    this.$toast("已经领光啦，下次再来吧");
                    return false;
								}else {
                   let toast1 = this.$toast.loading({
                        mask: true,
                        message: '领取中...',
                        duration:0
                    });
                    this.$post('user_get_coupon',{coupon_id:coupon_id,user_token:this.$store.getters.getUserToken})
                        .then((msg)=>{
                            console.log(this.coupon_info.coupon_remainder_number);
                            toast1.clear();
                            if(msg === "领券成功"){
                                this.coupon_info.coupon_remainder_number = parseInt(this.coupon_info.coupon_remainder_number ) - 1;
														}
                            this.$toast(msg);
										})
								}
            },
            /*格式化日期*/
            dateFtt(fmt,date){ //author: meizz
                let o = {
                    "M+" : date.getMonth()+1,                 //月份
                    "d+" : date.getDate(),                    //日
                    "h+" : date.getHours(),                   //小时
                    "m+" : date.getMinutes(),                 //分
                    "s+" : date.getSeconds(),                 //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            }
				},
    };
</script>

<style lang="scss" scoped>
	.coupon-box{
		width: 90%;
		margin-left: 5%;
		height: 130px;
		box-shadow:0 0 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		background-color: #fff;
		overflow: hidden;
		margin-top: 10px;
		margin-bottom: 10px;
		.coupon-head{
			height: 85px;
			display: flex;
			.coupon-head-l{
				flex: 1;
				.coupon-cut-sum{
					padding: 7px 15px;
					color: #f44;
					font-size: 36px;
					height: 50px;
					font-weight: 500;
					line-height: 50px;
					span{
						font-size: 12px;
					}
				}
				.coupon-found_sum{
					font-size: 12px;
					line-height: 16px;
					color: #969799;
					padding: 0px 15px;
				}
			}
			.coupon-head-r{
				flex: 2;
				.coupon-name{
					padding: 7px 15px;
					height: 50px;
					font-weight: 500;
					line-height: 50px;
					font-size: 18px;
				}
				.coupon-grant-time{
					font-size: 12px;
					line-height: 16px;
					color: #969799;
				}
			}
		}
		.coupon-desc{
			height: 20px;
			font-size: 12px;
			line-height: 12px;
			color: #969799;
			padding: 7px 15px;
			border-top: 1px dashed #ebedf0;
			background-color: #fafafa;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

	}

</style>