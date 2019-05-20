<template>
	<div>
		<van-nav-bar class="my-nav-bar" :title="title" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
			<van-icon name="shop" slot="right"/>
		</van-nav-bar>
		<div class="d"></div>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {

        },
        props: ["title"],
        methods: {
            GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
                let goods_id = this.GetQueryString('gl_goods_id');
                if (goods_id != null && goods_id.length > 1 &&(/(^[1-9]\d*$)/.test(parseInt(goods_id))) ) {
                    /* 直接跳转*/
                    window.location.href = this.$store.state.location_url;
                }else {
                    this.$router.push('/')
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
	.my-nav-bar {
		width: 100%;
		position: fixed;
		z-index: 999 !important;
	}
	
	.d {
		width: 100%;
		height: 45px;
	}
</style>