'use strict';
var Vue = require('vue');
// var VueValidator = require('vue-validator');

var Loading = require('component/loading/loading.js');
// Vue.use(VueValidator);
var todoCookieStorage = require('store').todoCookieStorage;



module.exports = Vue.extend({
    template: require('./info.html'),
    data: function() {
        return {
            loaded: false,
            id: null,
            name: todoCookieStorage.fetch('name'),
            phone: todoCookieStorage.fetch('phone'),
            area: {
                shops: null
            },
            areaId: null,
            shop: null,
            shops: null,
            shopData: null,
            citys: null,
            bDialog: false,
        };
    },
    watch: {
        phone: {
            handler: function(phone) {
                todoCookieStorage.save('phone', phone);
            }
        },
        name: {
            handler: function(name) {
                todoCookieStorage.save('name', name);
            }
        }
    },
    route: {
        data: function(transi) {
            this.id = transi.to.params.id;
            // 1 quan+buy  2 buy 3 book 4 quan
            this.type = transi.to.params.type;
            this.productId = transi.to.params.productId;
        }
    },
    validators: {
        phone: function(val) {
            return /^[0-9]{11}$/.test(val);
        }
    },
    components: {
        'loading': Loading
    },
    ready: function() {
            // this.$els.name.focus();
        this.getCity();

    },
    methods: {
        getCity: function() {

            var api = {
                url: '/api/d11/get-shop-list',
                params: { id: this.id }
            };
            this.$http({
                    url: api.url,
                    method: 'GET',
                    params: api.params
                })
                .then(function(res) {
                    if (!res.data.status) {
                        this.shopData = res.data.data;
                        this.loaded = true;
                    } else {
                    }

                }, function(res) {
                    this.citys = ['获取失败请刷新页面'];
                    console.log(res);
                });
        },
        infoSumit: function(e) {
            var _self = this;

            this.$validate(true, function() {
                if (_self.$valiInfo.invalid) {
                    e.preventDefault();
                } else {
                    var api = {
                        url: '/api/d11/brands-nov-submit'
                    };
                    var formData = new FormData();
                    formData.append('product_id', _self.productId);
                    formData.append('register_name', _self.name);
                    formData.append('mobile', _self.phone);
                    formData.append('area_id', _self.area.areaId);
                    formData.append('shop_id', _self.shop);
                    _self.$http.post(api.url, formData)
                        .then(function(res) {
                            if (!res.data.status) {
                                _self.bDialog = true;

                            } else {
                                if (res.data.status == 2 || res.data.status == 3) {
                                    alert(_alertError(res.data.error));
                                } else {
                                    alert(res.data.message);
                                }
                            }


                        }, function(res) {
                            console.log(res);
                        });
                }
            });
            function _alertError(obj){
                for(var attr in obj) {
                    return obj[attr];
                }
            }
        }
    }
});
