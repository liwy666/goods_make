<template>
	<div>
		<van-cell is-link @click="show = !show">
				<span class="custom-text">领券</span>
				<van-tag plain type="danger" v-for="(item) in coupon_list" :key="item.coupon_id">{{item.coupon_name}}</van-tag>
		</van-cell>
		<van-popup v-model="show" position="bottom">
			<van-nav-bar
				title="优惠券"
			/>
			<div class="coupon-box">
				<myCoupon v-for="(item) in coupon_list" :key="item.coupon_id" :coupon_info="item"></myCoupon>
			</div>
			<div class="brace"></div>
			<van-button type="danger" size="large"  @click="show = !show"> 确 认 </van-button>
		</van-popup>
	</div>
</template>

<script>
    import myCoupon from '../../sub/my-coupon';
    export default {
        data() {
            return {
                show:false,
						};
        },
        props:["coupon_list"],
        created() {

        },
        methods: {

				},
        components: {
            myCoupon//优惠券
        },
    };
</script>

<style lang="scss" scoped>
	.brace{
		width: 100%;
		height: 50px;
	}
	.van-button{
		position: fixed;
		bottom: 0;
	}
	.coupon-box{
		height: 500px;
		overflow-y: auto;
	}
</style>