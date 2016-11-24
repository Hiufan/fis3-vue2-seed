'use strict';
var Vue = require('vue');
var Loading = require('component/loading/loading.js');
// var datetime = require('filter/datetime.js');


module.exports = Vue.extend({
    template: require('./home.html'),
    data: function() {
        return {
            loaded: false,
            homeData: null,
            lazyloadImg: null,
            timer: null,
            hour: null,
            min: null,
            sec: null,
        };
    },
    components: {
        'loading': Loading,
    },
    created: function() {
        this.statsE({'t': 'pageview'});
        this.getList();

    },
    ready: function() {
    },
    beforeDestroy: function() {
    },
    methods: {
        _getTime: function(t) {
            // var day = parseInt(t / (60 * 60 * 24));
            this.hour = _toTwo(parseInt(t / (60 * 60)));
            this.min = _toTwo(parseInt(t % (60 * 60) / 60));
            this.sec = _toTwo(parseInt(t % (60 * 60) % 60));

            function _toTwo(d) {
                return d < 10 ? '0' + d : d;
            }
        },
        beginInterval: function(t){
            var _self = this;
            this._getTime(t);
            this.timer = setInterval(function(){
                t--;
                if (t < 0) {
                    clearInterval(_self.timer);
                }
                _self._getTime(t);
            },1000);
        },
        getList: function(){
            var api = {
                url: '/api/d11/brands-nov'
            };
            this.$http({
                url: api.url,
                method: 'GET',
                // params: api.params
            })
            .then(function (res) {
                if (!res.data.status) {
                    this.homeData = res.data.data;
                    this.loaded = true;
                    this.beginInterval(this.homeData.actNextData.data.remainingTime);


                }else {
                    console.log(res.data.message);
                }
            }, function (res) {
                console.log(res);
            });
        }
    }
});
