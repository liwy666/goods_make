import wx from 'weixin-js-sdk';
import {fetch} from './http'
/**
 *分享
 * @param _this
 * @param shareTitle 标题
 * @param shareUrl 链接
 * @param shareImg 图片
 * @param shareDesc 描述
 */
export const commonShare = (_this, shareTitle, shareUrl, shareImg, shareDesc) => {

    let  now_url =encodeURIComponent(window.location.href.split('#')[0]);
    fetch('get_WxJsSdk', {url: now_url})
        .then((msg) => {
            wx.config({
                debug: false,
                appId: msg.appId,
                timestamp: msg.timestamp,
                nonceStr: msg.nonceStr,
                signature: msg.signature,
                jsApiList: ['onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'updateAppMessageShareData',
                    'updateTimelineShareData'],
            });
            wx.ready(function(){
                wx.checkJsApi({
                    jsApiList: ['onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        'updateAppMessageShareData',
                        'updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        console.log(res);
                    }
                });

                wx.updateAppMessageShareData({
                    title:shareTitle, // 分享标题
                    desc: shareDesc, // 分享描述
                    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                });

                wx.updateTimelineShareData({
                    title:shareTitle, // 分享标题
                    desc: shareDesc, // 分享描述
                    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                });
            });
            wx.error(function(res){
                console.log(res);
            });
        });
};