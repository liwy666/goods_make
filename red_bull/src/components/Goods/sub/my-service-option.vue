<template>
    <div>
        <van-cell title="岗隆自营放心购" label="原装正品|电子发票|专业服务商|顺丰速运|7天无理由|全国联保|售后无忧" is-link @click="show = !show"/>
        <van-popup v-model="show" position="bottom">
            <van-nav-bar
                    title="岗隆自营放心购"
            />
            <van-cell icon="star-o" title="原装正品" label="正规渠道，全新原装"/>
            <van-cell icon="coupon-o" title="电子发票" label="根据国家政策，开具电子发票"/>
            <van-cell icon="thumb-circle-o" title="专业服务商" label="岗隆已服务千万级客户"/>
            <van-cell icon="logistics" title="顺丰速运" label="配送更快更优"/>
            <van-cell icon="clock-o" title="7天无理由" label="未激活、无人为损坏不影响二次销售"/>
            <van-cell icon="passed" title="全国联保" label="全国联保，国家三包"/>
            <van-cell icon="friends-o" title="售后无忧" label="专业售后团队让您的数码产品用得更加舒心和顺心"/>
            <van-button type="danger" size="large" @click="show = !show"> 确 认</van-button>
        </van-popup>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            };
        },
        created() {

        },
        methods: {},
    };
</script>

<style lang="scss" scoped>

</style>