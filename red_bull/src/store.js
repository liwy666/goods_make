import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //into_type: 'redBullMake-hw',
        into_type: 'redBullMake-gl',
        back_url:'http://mate.ganglonggou.com/make/red_bull',
        share_url:'http://mate.ganglonggou.com/make/red_bull',
        //share_url:'https://api.ganglonggou.com/make/red_bull',
        location_url:'http://mate.ganglonggou.com/goods_make/red_bull/',
        goods_info: {
            goods_gallery: [],//商品相册
            goods_sku_list: [],//sku表
            goods_number: 1,//商品数量
            goods_sn: '',
            goods_name: '',
            goods_id: 0,
            goods_head_name: '',
            goods_price: 0,//商品价格
            one_goods_price: 0,//商品单价
            market_price: 0,//划线价
            goods_stock: 0,//商品库存
            goods_sales_volume: 0,//销量（预约量）
            goods_attribute_img: '',//当前属性图片
            sku_id: 0,//所选属性id
            attr_desc: '',//所选属性详情
        }//单个商品信息
        , goods_sku_options: []//sku选项

    },
    mutations: {

        /**
         * 初始化商品信息
         * @param state
         * @param new_goods_info
         */
        initGoodsInfo(state, new_goods_info) {
            Vue.set(state, 'goods_info', {
                goods_gallery: [],//商品相册
                goods_sku_list: [],//sku表
                goods_number: 1,//商品数量
                goods_sn: '',
                goods_name: '',
                goods_head_name: '',
                goods_price: 0,//商品价格
                one_goods_price: 0,//商品单价
                market_price: 0,//划线价
                goods_stock: 0,//商品库存
                goods_sales_volume: 0,//销量（预约量）
                goods_attribute_img: '',//当前属性图片
                sku_id: 0,//所选属性id
                attr_desc: '',//所选属性详情
                attr_desc2: '',//所选属性详情2
            });
            Vue.set(state.goods_info, 'goods_price', new_goods_info.shop_price);
            Vue.set(state.goods_info, 'market_price', new_goods_info.market_price);
            Vue.set(state.goods_info, 'goods_sn', new_goods_info.goods_sn);
            Vue.set(state.goods_info, 'goods_id', new_goods_info.goods_id);
            Vue.set(state.goods_info, 'goods_name', new_goods_info.goods_name);
            Vue.set(state.goods_info, 'goods_head_name', new_goods_info.goods_head_name);
            Vue.set(state.goods_info, 'goods_sales_volume', new_goods_info.goods_sales_volume);
            state.goods_info.goods_gallery.push(new_goods_info.goods_img);
        },
        /**
         * 初始化商品Sku
         * @param state
         * @param new_goods_info
         */
        initGoodsSkuOptions(state, new_goods_info) {
            state.goods_sku_options = [];
            if (new_goods_info !== "" && new_goods_info !== null) {
                new_goods_info.attribute.forEach((item) => {
                    let attribute_name = item.attribute_name;
                    let attribute_value = [];
                    item.attribute_value.forEach((item2, i2) => {
                        attribute_value.push({name: item2, xz_flag: i2 === 0 ? true : false})
                    });
                    state.goods_sku_options.push({attribute_name: attribute_name, attribute_value: attribute_value});
                })
            }
        },
        /**
         * 切换商品属性
         * @param state
         * @param key
         */
        updGoodsSkuAttr(state, key) {
            if (state.goods_sku_options.length > 0) {
                //遍历对应goods_sku,将所有xz_flag赋值为false
                state.goods_sku_options[key.key1].attribute_value.forEach((item2, i2) => {
                    Vue.set(state.goods_sku_options[key.key1].attribute_value[i2], 'xz_flag', false)
                });
                //赋值对应xz_flag为true
                Vue.set(state.goods_sku_options[key.key1].attribute_value[key.key2], 'xz_flag', true);
                let goods_sku_ = state.goods_sku_options;
                state.goods_sku_options = [];
                state.goods_sku_options = goods_sku_;
                //更新goods_info
                this.dispatch('updGoodsInfo');
            }
        },
        /**
         * 切换商品数量
         * @param state
         * @param number
         */
        updGoodsSkuNumber(state, number) {
            let data = {};
            data.goods_number = parseInt(number);
            let obj = Object.assign({}, state.goods_info, data);
            state.goods_info = {};
            state.goods_info = obj;
            //更新goods_info
            this.dispatch('updGoodsInfo');
        },
    },
    actions: {
        /**
         * 更新商品信息
         * @param context
         */
        updGoodsInfo(context) {
            /*拼接选中sku_desc*/
            let sku_desc_array = [];
            context.state.goods_sku_options.forEach(item => {
                item.attribute_value.forEach(item2 => {
                    if (item2.xz_flag) {
                        sku_desc_array.push(item2.name);
                    }
                })
            });
            let sku_desc = sku_desc_array.join(',');
            context.state.goods_info.goods_sku_list.forEach(item => {
                console.log(item.sku_desc);
                if (item.sku_desc === sku_desc) {
                    Vue.set(context.state.goods_info, 'one_goods_price', item.sku_shop_price);
                    Vue.set(context.state.goods_info, 'market_price', item.sku_market_price);
                    Vue.set(context.state.goods_info, 'goods_stock', item.sku_stock);
                    Vue.set(context.state.goods_info, 'goods_attribute_img', item.img_url);
                    Vue.set(context.state.goods_info, 'sku_id', item.sku_id);
                    Vue.set(context.state.goods_info, 'attr_desc', item.sku_desc);
                }
            });
            //商品价格
            Vue.set(context.state.goods_info, 'goods_price', parseFloat(context.state.goods_info.one_goods_price * context.state.goods_info.goods_number).toFixed(2));

        }
    },
    getters: {
        getGoodsSku(state) {
            return state.goods_sku_options;
        },
        getGoodsInfo(state) {
            return state.goods_info;
        },
    }
})
