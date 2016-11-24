'use strict';
var Vue = require('vue');

var Loading = require('component/loading/loading.js');
var Login = require('component/login/login.js');

var todoCookieStorage = require('store').todoCookieStorage;


module.exports = Vue.extend({
    template: require('./shopping.html'),
    data: function() {
        return {
            loaded: false,
            bDialog: false,
            loginShow: false,
            salesLists: {},
            actLists: {},
            activeActId: null,
            activeActIdClass: null,

            states: [
                ['已结束', '已结束'],
                ['正在进行', '马上抢'],
                ['即将开始', '未开始']
            ],
            counttimes: {},
            counttimesBtn: [],
            actTips: {},
            timer: {},
            token: null
        };
    },
    watch: {
        counttimes: {
            handler: function(cts) {
                for (var attr in cts) {

                    if (cts[attr] == '00:00') {
                        if (!!this.counttimesBtn[attr]) return;
                        this.counttimesBtn[attr] = true;
                        var _obj = {};
                        _obj[attr] = '';

                        this.actTips = Object.assign({}, this.actTips, _obj);


                        var _actList = this.actLists[attr];
                        if (typeof Object.assign != 'function') {
                            this._mockAssign();
                        }
                        _actList = Object.assign({}, _actList, {
                            actState: this.states[1],
                            stateNum: 2
                        });
                        var _obj = {};
                        _obj[attr] = _actList;
                        this.actLists = Object.assign({}, this.actLists, _obj);
                        // this.actLists = Object.assign({}, this.actLists, {
                        //     [attr]: _actList
                        // });
                    } else {
                        var _obj = {};
                        _obj[attr] = '距离活动开始还有<span>' + cts[attr] + '</span>';
                        this.actTips = Object.assign({}, this.actTips, _obj);
                        // this.actTips = Object.assign({}, this.actTips, {
                        //     [attr]: '距离活动开始还有<span>' + cts[attr] + '</span>'
                        // });
                    }
                }
            }
        }
    },
    route: {
        data: function(transi) {
            this.subjectId = transi.to.params.subjectId;
            this.actId = transi.to.params.actId;
        }
    },
    validators: {
        phone: function(val) {
            return /^[0-9]{11}$/.test(val);
        }
    },
    components: {
        'loading': Loading,
        'login': Login
    },
    ready: function() {
        this.verifyToken();
        this.getInitData();

    },
    methods: {
        verifyToken: function() {
            this.token = todoCookieStorage.fetch('token');
            if (!!this.token) {

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
                                todoCookieStorage.save('phone', res.data.data.userInfo.mobile);

                            } else {
                                this.loginShow = true;

                            }
                        } else {
                            this.loginShow = true;
                            console.log(res.data.message);
                        }

                    }, function(res) {
                        console.log(res);
                    });
            } else {
                this.loginShow = true;
            }
        },
        getTabData: function(actId) {
            this.activeActIdClass = actId;
            if (!!this.salesLists[actId]) return;

            var api = {
                url: '/api/d11/index',
                params: {
                    actId: actId,
                    subjectId: this.subjectId
                }
            };
            this.$http({
                    url: api.url,
                    method: 'GET',
                    params: api.params
                })
                .then(function(res) {
                    if (!res.data.status) {
                        var _obj = {};
                        _obj[actId] = res.data.data.salesList;
                        this.salesLists = Object.assign({}, this.salesLists, _obj);
                        // this.salesLists = Object.assign({}, this.salesLists, {
                        //     [actId]: res.data.data.salesList
                        // });
                    } else {
                        console.log(res.data.message);
                    }


                }, function(res) {

                    console.log(res);
                });


        },
        /**
         * getInitData 获取抢购页数据
         * @return {[type]} [description]
         */
        getInitData: function() {
            var api = {
                url: '/api/d11/index',
                params: {
                    actId: this.actId,
                    subjectId: this.subjectId
                }
            };
            this.$http({
                    url: api.url,
                    method: 'GET',
                    params: api.params
                })
                .then(function(res) {
                    if (!res.data.status) {

                        var initData = res.data.data;
                        this.activeActId = initData.actId;
                        this.activeActIdClass = initData.actId;

                        var systemTime = initData.systemTime;

                        this.salesLists[initData.actId] = initData.salesList;

                        for (var i = 0; i < initData.actList.length; i++) {
                            this.actLists[initData.actList[i].actId] = initData.actList[i];

                            var actList = this.actLists[initData.actList[i].actId];
                            var actTime = new Date(actList.startTime * 1000);


                            // var nowTime = parseInt(new Date().getTime()/1000);
                            actList.actTime = (actTime.getMonth() + 1) + '月' + actTime.getDate() + '日' + actTime.getHours() + ':' + this._toTwo(actTime.getMinutes());
                            if (systemTime < actList.startTime) {
                                actList.actState = this.states[2];
                                actList.stateNum = 3;

                                this.beginInterval(actList.actId, actList.startTime - systemTime);

                                this.actTips[i] = '距离活动开始还有<span>' + this.counttimes[actList.actId] + '</span>';
                            } else if (systemTime > actList.endTime) {
                                actList.actState = this.states[0];
                                actList.stateNum = 1;

                                this.actTips[actList.actId] = '本活动已结束';
                            } else {
                                actList.actState = this.states[1];
                                actList.stateNum = 2;

                                this.actTips[actList.actId] = '';
                            }
                        }

                        this.loaded = true;
                    } else {
                        console.log(res.data.message);
                    }


                }, function(res) {
                    console.log(res);
                });
        },
        _getTime: function(i, t) {
            var _obj = {};
            _obj[i] = this._toTwo(parseInt(t / 60)) + ':' + this._toTwo(parseInt(t % 60));
            if (typeof Object.assign != 'function') {
                this._mockAssign();
            }
            this.counttimes = Object.assign({}, this.counttimes, _obj);
            // this.counttimes = Object.assign({}, this.counttimes, {
            //     [i]: _toTwo(parseInt(t / 60)) + ':' + _toTwo(parseInt(t % 60))
            // });
            // this.counttimes[i] =  _toTwo(parseInt(t / 60)) + ':' + _toTwo(parseInt(t % 60));

        },
        _mockAssign: function() {
            Object.assign = function(target) {
                'use strict';
                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                target = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source != null) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                }
                return target;
            };

        },
        _toTwo: function(d) {
            return d < 10 ? '0' + d : d;

        },
        beginInterval: function(i, t) {
            var _self = this;
            this._getTime(i, t);
            this.timer[i] = setInterval(function() {

                t--;
                if (t <= 0) {
                    // 状态功能补充
                    clearInterval(_self.timer[i]);

                }
                _self._getTime(i, t);
            }, 1000);
        }
    }
});
