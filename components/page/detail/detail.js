'use strict';
var Vue = require('vue');

var Loading = require('component/loading/loading.js');
var todoCookieStorage = require('store').todoCookieStorage;
var Login = require('component/login/login.js');
var Modal = require('component/modal/modal.js');
//倒计时如果刚好切换 需要改变状态
module.exports = Vue.extend({
    template: require('./detail.html'),
    data: function() {
        return {
            loaded: false,
            id: null,
            detailData: null,
            stateNum: false,
            loginShow: false,
            payUrl: null,
            modalPay: false,
            modalSoldOut: false,
            token: null
        };
    },
    route: {
        data: function(transi) {
            this.id = transi.to.params.id;
            this.stateNum = transi.to.params.shopping;
        }
    },
    components: {
        'loading': Loading,
        'login': Login,
        'modal': Modal
    },
    created: function(){
        this.statsE({'t': 'pageview'});
    },
    ready: function() {

        // 如果是
        this.getList();

    },
    methods: {
        goBack: function() {
            history.go(-1);
        },
        /**
         * getList 获取详细页面数据
         * @return {[type]} [description]
         */
        getList: function() {
            var api = {
                url: '/api/d11/brands-nov-product-details',
                params: { id: this.id }
            };
            this.$http({
                    url: api.url,
                    method: 'GET',
                    params: api.params
                })
                .then(function(res) {
                    if (!res.data.status) {
                        this.detailData = res.data.data;
                        this.loaded = true;

                    } else {
                        console.log(res.data.message);
                    }

                }, function(res) {
                    console.log(res);
                });
        },
        /**
         *  goBuy 支付操作
         * @return {[type]} [description]
         */
        goBuy: function() {
            var _self = this;
            this.token = todoCookieStorage.fetch('token');
            // 先登录判断
            if (!!this.token) {
                // 判断是否已注册
                var api = {
                    url: '/api/d11/user',
                    params: { token: this.token }
                };
                this.$http({
                        url: api.url,
                        method: 'GET',
                        params: api.params
                    })
                    .then(function(res) {
                        if (!res.data.status) {
                            if (!!res.data.data.userInfo) {
                                todoCookieStorage.save('phone',res.data.data.userInfo.mobile);
                                //检查库存
                                    _self.getSalesNum();

                            }else {
                                this.loginShow = true;

                            }
                        } else {
                            this.loginShow = true;
                        }

                    }, function(res) {
                        console.log(res);
                    });
            } else {
                this.loginShow = true;
            }
        },
        /**
         * getSalesNum 检查库存并购买
         * @return {[type]} [description]
         */
        getSalesNum: function() {
            var api = {
                url: '/api/d11/salesnum?token='+this.token,
                // params: { id: this.id }
            };
            var formData = new FormData();
            formData.append('salesId', this.id);
            this.$http.post(api.url,formData)
                .then(function(res) {
                    if (!res.data.status) {
                        if (res.data.data.salesNum != 0) {
                            // 有库存进行提示
                            // this.detailData = res.data.data;
                            // this.payUrl = '';
                            this.modalPay = true;
                        }else {
                            // 没有库存进行提示
                            this.modalSoldOut = true;
                        }
                    } else {

                        console.log(res.data.message);
                    }

                }, function(res) {
                    console.log(res);
                });
        },
        /**
         * goPay 去支付
         * @return {[type]} [description]
         */
        goPay: function() {
            var api = {
                url: '/api/d11/buy?token='+this.token,
                // params: { id: this.id }
            };
            var formData = new FormData();
            formData.append('salesId', this.id);
            this.$http.post(api.url,formData)
                .then(function(res) {
                    if (!res.data.status) {
                        // this.detailData = res.data.data.jumpUrl;
                        window.location.href = res.data.data.payUrl;
                    } else {
                        console.log(res.data.message);
                    }

                }, function(res) {
                    console.log(res);
                });
        }
    }
});
