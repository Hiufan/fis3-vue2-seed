'use strict';
var Vue = require('vue');
var VueResource = require('vue-resource');

var Loading = require('component/loading/loading.js');
Vue.use(VueResource);


module.exports = Vue.extend({
    template: require('./brand.html'),
    data: function() {
        return {
            loaded: false,
            id: null,
            brandData: null,
            page: 1,
            bMore: true,
            bLoadingMore: false,
            _scrollThr: null

        }
    },
    route: {
        data: function(transi) {
            this.id = transi.to.params.id;
        }
    },
    components: {
        'loading': Loading,
    },
    created: function(){
        this.statsE({'t': 'pageview'});
    },
    ready: function() {
        var _self = this;
        this._scrollThr = this.throttle(this.scrollHandler.bind(this), 50, 100);

        window.addEventListener('scroll', this._scrollThr);
        this.getList(function(data) {
            _self.page++;
            _self.brandData = data;
            document.title = '到'+_self.brandData.brandData.brandName+'购车，先上美骑看车团';

            if (!data.saleList.length) {
                window.removeEventListener('scroll', _self._scrollThr);
                _self.bMore = false;
            }
            _self.loaded = true;
        });
    },
    methods: {
        scrollHandler: function() {
            var _self = this;
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
                if (this.bLoadingMore) {
                    return false
                }
                this.statsE({'t': 'pageview','p':_self.page});
                this.stats({'ec': 'index_list_page','ea': 'request'});
                this.getList(function(data) {
                    _self.page++;
                    // _self.brandData = data;
                    if (!data.saleList.length) {
                        window.removeEventListener('scroll', _self._scrollThr);
                        _self.bMore = false;
                    }else {
                        _self.brandData.saleList = _self.brandData.saleList.concat(data.saleList);
                    }
                });
            }
        },
        throttle: function(fn, delay, mustRunDelay) {
            var timer = null;
            var t_start;
            return function() {
                var context = this,
                    args = arguments,
                    t_curr = +new Date();
                clearTimeout(timer);
                if (!t_start) {
                    t_start = t_curr;
                }
                if (t_curr - t_start >= mustRunDelay) {
                    fn.apply(context, args);
                    t_start = t_curr;
                } else {
                    timer = setTimeout(function() {
                        fn.apply(context, args);
                    }, delay);
                }
            };
        },
        getList: function(cb) {
            var api = {
                url: '/api/d11/brands-nov-product-list',
                params: { brand_id: this.id, page: this.page }
            };
            this.bLoadingMore = true;
            this.$http({
                    url: api.url,
                    method: 'GET',
                    params: api.params
                })
                .then(function(res) {
                    if (!res.data.status) {
                        cb && cb(res.data.data);

                    } else {
                        console.log(res.data.message);
                    }
                    this.bLoadingMore = false;
                }, function(res) {
                    this.bLoadingMore = false;
                    console.log(res);
                });
        },
        getMore: function() {
	        var _self = this;
            this.getList(function(data) {
                _self.page++;
                if (!data.saleList.length) {
                    window.removeEventListener('scroll', _self._scrollThr);
                    _self.bMore = false;
                }else {
	                _self.brandData.saleList = _self.brandData.saleList.concat(data.saleList);
                }
            });
        },

    }
});
