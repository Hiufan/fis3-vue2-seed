'use strict';
var Vue = require('vue');
var Loading = require('component/loading/loading.js');
var todoCookieStorage = require('store').todoCookieStorage;
module.exports = Vue.extend({
    template: require('./success.html'),
    data : function(){
        return {
        	loaded: false,
        	success: true,
        	orderId: null

        }
    },
    route: {
        data: function(transi) {
            this.orderId = transi.to.params.orderId;
        }
    },
    components: {
    	loading: Loading
    },
    create: function(){
		document.title = '支付详情';

    },
	ready:function(){
		this.getState();
	},
	methods: {
		getState: function(){
			var api = {
                url: '/api/d11/orderstatus?token='+todoCookieStorage.fetch('token'),
                params: { orderNo: this.orderId }
            };
            this.$http({
                    url: api.url,
                    method: 'GET',
                    params: api.params
                })
                .then(function(res) {
                    if (!res.data.status) {
                    	this.loaded = true;
                        if (res.data.data.status == 2) {
                            this.success = true;
                        }else {
                            this.success = false;

                        }

                    } else {
                        console.log(res.data.message);
                    }

                }, function(res) {
                    console.log(res);
                });
		}
	}
});
