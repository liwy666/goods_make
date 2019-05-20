<template>
	<div class="main">
		<div class="l">距结束还剩：</div>
		<div class="r">
			<span>{{this.time.d}}</span><i>天</i>
			<span>{{this.time.h}}</span><i>时</i>
			<span>{{this.time.m}}</span><i>分</i>
			<span>{{this.time.s}}</span><i>秒</i>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                time: {
                    d: 0,
                    h: 0,
                    m: 0,
                    s: 0
                },
                flag: false

            };
        },
        props: ["end_time"],
        computed: {},
        created() {
            let time = setInterval(() => {
                if (this.flag == true) {
                    clearInterval(time)
                }
                this.timeDown()
            }, 500)
        },
        methods: {
            timeDown() {
                const endTime = new Date(this.end_time * 1000);
                const nowTime = new Date();
                let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
                let d = this.formate(parseInt(leftTime / (24 * 60 * 60)));
                let h = this.formate(parseInt(leftTime / (60 * 60) % 24));
                let m = this.formate(parseInt(leftTime / 60 % 60));
                let s = this.formate(parseInt(leftTime % 60));
                if (leftTime <= 0) {
                    this.flag = true;
                    this.$emit('time-end')
                }
                this.time.d = d;
                this.time.h = h;
                this.time.m = m;
                this.time.s = s;
            },
            formate(time) {
                if (time >= 10) {
                    return time
                } else if (time === 0) {
                    return '00';
                } else {
                    return `0${time}`
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
	.main{
		width: 100%;
		height: 50px;
		background-image: linear-gradient(45deg,#e83051,#f19483);
		.l{
			color: white;
			font-size: 12px;
			padding: 5px;
		}
		.r{
			display: flex;
			span{
				display: block;
				background-color: white;
				width: 20px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				margin-left: 5px;
			}
			i{
				color: white;
				font-style: normal;
				margin-left: 5px;
			}
		}
	}
</style>