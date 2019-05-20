<template>
	<div class="main">
		<van-nav-bar
			class="my-nav-bar"
			:title="title"
			left-text="返回"
			@click-left="onClickLeft"
		/>
		<div id="d" class="d"></div>
		<iframe frameborder=0 class="iframe-box" id="my-iframe"
						:src="src"
						:height="iHeight"
		></iframe>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                iWidth:0,
                iHeight:0,
                title:"",
								src:""
						};
        },
        created() {

        },
        mounted(){
            this.src = this.$route.query.src;
            this.iHeight =document.documentElement.clientHeight - document.getElementById("d").offsetHeight;
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1);
						},
        },
        components: {
        },
    };
</script>

<style lang="scss" scoped>
	.iframe-box{
			width: 100%;
	}
	.d{
		width: 100%;
		height: 50px
	}
	.my-nav-bar{
		width: 100%;
		position: fixed;
	}
</style>