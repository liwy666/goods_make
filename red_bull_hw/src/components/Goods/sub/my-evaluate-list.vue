<template>
	<div class="main">
		<div class="evaluate-load" v-if="this.evaluate_count > 0">
			<van-list
				v-model="loading"
				:finished="finished"
				:error.sync="error"
				finished-text="没有更多了"
				error-text="请求失败，点击重新加载"
				@load="onLoad"
			>
				<myEvaluateInfo v-for="(item) in evaluate_list" :key="item.evaluate_id" :evaluate_info="item"></myEvaluateInfo>
			</van-list>
		</div>
		<div class="evaluate-no-load" v-else>
			<p>没有相应的评价,看看其他的~~</p>
		</div>
	</div>
</template>

<script>
	import myEvaluateInfo from './my-evaluate-info'
    export default {
        data() {
            return {
                loading:false,
                finished:false,
                error:false,
                page:1,
                limit:5,
                now_count:0,
                evaluate_list:[],
						};
        },
        props:["goods_id","evaluate_count"],
        created() {
					
        },
        methods: {
            onLoad(){
                if(this.evaluate_count > 0){
                    this.loading = true;
                    this.$fetch('user_get_evaluate_by_goods_id_and_page'
                        ,{goods_id:this.goods_id
                            ,page:this.page
                            ,limit:this.limit})
                        .then((msg)=>{
                            this.page++;
                            this.now_count += this.limit;
                            this.count = parseInt(msg.count);
                            if(this.now_count >= this.evaluate_count){
                                this.finished = true;
                            }
                            this.loading = false;
                            msg.data.forEach(item => {
                                this.evaluate_list.push(item)
                            });
                        })
								}else {
                    this.finished = true;
                    this.loading = false;
								}

						}
				},
        components: {
            myEvaluateInfo,//评论子组件
        },
    };
</script>

<style lang="scss" scoped>
	.evaluate-no-load{
		width: 100%;
		height: 600px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		p{
			width: 100%;
			text-align: center;
			height: 100px;
			font-size: 16px;
			color: #7d7e80;
			line-height: 100px;
		}
	}
</style>