<template>
	<div class="main">
		<div class="my-swipe">
			<van-swipe :autoplay="6000" indicator-color="white">
				<van-swipe-item v-for="(item, index) in swipe_img" :key="index">
					<img v-lazy="item.ad_img" @click="toGoods(item)"/>
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="my-tab-box">
			<div class="my-tab" v-for="(item,i) in get_info.cat_list" :key="item.cat_id"
				 @click="cat_index = i"
				 :class="[i === cat_index ? 'xz':'']">
				{{item.cat_name}}
			</div>
		</div>
		<transition-group class="my-goods-box" name="flip-list">
			<myGoodsCard v-for="(item) in goods_list" :key="item.goods_id" :goods_info_="item"></myGoodsCard>
		</transition-group>
		<div class="float-l" @click="toBackUrl"></div>
	</div>
</template>

<script>
    import myGoodsCard from '../sub/my-goods-card'
    import {commonShare} from "../../share";

    export default {
        data() {
            return {
                get_info: {},
                cat_index: 0
            };
        },
        computed: {
            swipe_img: {
                get: function () {
                    let result = [];
                    if (JSON.stringify(this.get_info) !== '{}') {
                        this.get_info.ad_list.forEach(item => {
                            if (item.position_type === '顶部广告轮播图') {
                                result.push(item);
                            }
                        })
                    }
                    return result;
                }
            },
            goods_list: {
                get: function () {
                    let result = [];
                    if (JSON.stringify(this.get_info) !== '{}') {
                        if (this.get_info.cat_list.length > 0 && this.get_info.goods_list.length > 0) {
                            let cat_id = this.get_info.cat_list[this.cat_index].cat_id;
                            this.get_info.goods_list.forEach(item => {
                                if (item.cat_id === cat_id) {
                                    result.push(item);
                                }
                            })
                        }
                    }
                    return result;
                }
            }
        },
        created() {
            this.getInfo();
            /*获取Url参数信息*/
            let cat_id_index = this.GetQueryString('cat_id_index');
            if (cat_id_index != null && cat_id_index.length >= 1) {
                if ((/(^[1-9]\d*$)/.test(parseInt(cat_id_index)))) {//验证正整数
					this.cat_index = parseInt(cat_id_index);
                    this.$set(this, 'cat_index', parseInt(cat_id_index));
                }
            }
        },
        activated() {
            /*获取Url参数信息*/
            let goods_id = this.GetQueryString('gl_goods_id');
            if (goods_id != null && goods_id.length > 1) {
                if ((/(^[1-9]\d*$)/.test(parseInt(goods_id)))) {//验证正整数
                    this.$router.push('goods/' + goods_id);
                }
            }
            /*分享*/
            commonShare(this, '“福利放送，人人有礼”指定vip专享', this.$store.state.location_url, this.$store.state.share_url + '/lib/images/logo.gif', '专属六大福利，温暖到一线，福利到一线');
        },
        methods: {
            getInfo() {
                this.$fetch('get_index_info', {into_type: this.$store.state.into_type})
                    .then((msg) => {
                        this.$set(this, 'get_info', msg);
                    })
            }
            , GetQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            , toBackUrl() {
                if (typeof (this.GetQueryString("initialSlide")) === "undefined") {
                    window.location.href = this.$store.state.share_url + '?log=false&initialSlide=1';
                } else {
                    let initialSlide_l = parseInt(this.GetQueryString("initialSlide"));
                    window.location.href = this.$store.state.share_url + '?log=false&initialSlide=' + initialSlide_l;
                }
            }
            , toGoods(item) {
                if (item.ad_type === '无响应') {
                    return false;
                } else if (item.ad_type === '商品ID') {
                    if (item.goods_id !== 0 && item.goods_id !== null && item.goods_id !== '') {
                        this.$router.push('goods/' + item.goods_id);
                    }
                }
            }
        },
        components: {
            myGoodsCard,
        },
    };
</script>

<style lang="scss" scoped>
	.my-swipe {
		height: 200px;
		overflow: hidden;

		img {
			width: 100%;
		}
	}

	.my-tab-box {
		display: flex;
		margin-top: 5px;
		box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
		background-color: rgb(11, 83, 161);

		.my-tab {
			background-color: rgb(11, 83, 161);
			color: white;
			height: 40px;
			line-height: 40px;
			width: 50%;
			text-align: center;
			transition: all ease 0.3s;
		}

		.xz {
			/*box-shadow: 0px -5px 1px 1px rgba(0,0,0,.3);*/
			color: rgb(11, 83, 161);
			background-color: white;
		}
	}

	.my-goods-box {
		display: flex;
		flex-wrap: wrap;
	}

	.flip-list-move {
		transition: transform 0.5s;
	}

	.lflip-list-enter-active, .flip-list-leave-active {
		transition: all 0.3s;
	}

	.flip-list-enter, .flip-list-leave-to {
		//opacity: 0;
		transform: translateY(60px);
	}

	.float-l {
		position: fixed;
		right: 0rem;
		top: 7.24637681rem;
		width: 0.72463768rem;
		height: 3.62318841rem;
		color: black;
		z-index: 999;
		background: url(../../assets/images/back2.gif) no-repeat 0 0;
		background-size: 100% 100%;
	}
</style>