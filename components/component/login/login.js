var Vue = require('vue');
var VueValidator = require('vue-validator');
Vue.use(VueValidator);
var todoCookieStorage = require('store').todoCookieStorage;

module.exports = Vue.component('login', {
    props: {
        'loginShow': {
            type: Boolean,
            required: true,
            twoWay: true
        }
    },
    template: require('./login.html'),
    data: function() {
        return {
            submitError: false,
            phone: todoCookieStorage.fetch('phone'),
            imgVali: null,
            phoneVali: null,
            codeImg: null,
            bGettingCode: false,
            countdown: 30,
            countdownTime: null,
            token: null,
            hasCodeImg: false
        }
    },
    watch: {
        phone: {
            handler: function(phone) {
                todoCookieStorage.save('phone', phone);
                if (this.hasCodeImg) return;
                var _self = this;
                this.$validate('phone', true, function() {
                    if (!_self.$valiLogin.phone.invalid) {
                        _self.refreshCodeImg(null, function() {
                            _self.hasCodeImg = true;
                        });
                    }
                });
            }
        }

    },
    ready: function() {

        this.token = todoCookieStorage.fetch('token');
        var _self = this;
        if (!!this.token) {
            if (!!this.phone) {
                this.$validate('phone', true, function() {
                    // 有电话则自动刷新验证码
                    if (!_self.$valiLogin.phone.invalid) {
                        _self.refreshCodeImg(null, function() {
                            _self.hasCodeImg = true;
                        });
                    }
                });
            }
        } else {
            if (!!this.phone) {
                this.$validate('phone', true, function() {
                    if (!_self.$valiLogin.phone.invalid) {
                        _self.getToken(function(token) {
                            _self.token = token;
                            _self.refreshCodeImg(null, function() {
                                _self.hasCodeImg = true;
                            });
                        });
                    } else {
                        _self.getToken(function(token) {
                            _self.token = token;
                        });
                    }
                });
            } else {
                this.getToken(function(token) {
                    _self.token = token;
                });
            }
        }

    },
    validators: {
        phone: function(val) {
            return /^[0-9]{11}$/.test(val);
        }
    },
    methods: {
        /**
         * loginSumit 提交注册
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        loginSumit: function(e) {
            var _self = this;
            this.$validate(true, function() {
                if (_self.$valiLogin.invalid) {
                    e.preventDefault();
                } else {
                    _self.submitError = false;
                    var api = {
                        url: '/api/d11/login?token=' + _self.token,
                        // params: {
                        //     mobile: _self.phone,
                        //     verifyCode: _self.imgVali,
                        //     smscode: _self.phoneVali
                        // }
                    };
                    var formData = new FormData();
                    formData.append('mobile', _self.phone);
                    formData.append('verifyCode', _self.imgVali);
                    formData.append('smscode', _self.phoneVali);
                    _self.$http.post(api.url, formData)
                        .then(function(res) {
                            if (!res.data.status) {
                                todoCookieStorage.save('token', res.data.data.token);

                                _self.loginShow = false;
                            } else {
                                _self.submitError = true;
                            }

                        }, function(res) {
                            _self.submitError = true;
                            console.log(res);
                        });

                }
            });
        },
        /**
         * getToken 获取token
         * @return {[type]} [description]
         */
        // getToken: function(cb) {
        //     var api = {
        //         url: '/api/d11/token',
        //         params: {
        //             key: '1_edadb716efad0a7fa3be5f9da3b86e8a'
        //         }
        //     };
        //     this.$http({
        //             url: api.url,
        //             method: 'GET',
        //             params: api.params
        //         })
        //         .then(function(res) {
        //             if (!res.data.status) {
        //                 console.log(res.data.data);
        //                 this.token = res.data.data.token;
        //                 cb && cb();
        //             } else {
        //                 console.log(res.data.message);
        //             }

        //         }, function(res) {
        //             console.log(res);
        //         });
        // },

        /**
         * refreshCodeImg 刷新验证图片
         * @return {[type]} [description]
         */
        refreshCodeImg: function(e, cb) {
            var _self = this;

            this.$validate('phone', true, function() {
                if (_self.$valiLogin.phone.invalid) {
                    e && e.preventDefault();
                } else if (!_self.token) {
                    _self.getToken(function(token){
                            _self.token = token;
                        });
                } else {
                    var api = {
                        url: '/api/d11/captcha',
                        params: {
                            mobile: _self.phone,
                            token: _self.token
                        }
                    };
                    _self.$http({
                            url: api.url,
                            method: 'GET',
                            params: api.params
                        })
                        .then(function(res) {
                            if (!res.data.status) {
                                cb && cb();
                                _self.codeImg = res.data.data.captcha;
                            } else {
                                alert(res.data.message);
                            }
                        }, function(res) {
                            console.log(res);
                        });

                }
            });

        },
        /**
         * verifyCodeImg 验证验证图片
         * @param  {Function} cb [description]
         * @return {[type]}      [description]
         */
        verifyCodeImg: function(cb) {
            var api = {
                url: '/api/d11/verifycode?token=' + this.token,
                // params: {
                //     mobile: this.phone,
                //     verifyCode: this.imgVali
                // }
            };
            var formData = new FormData();
            formData.append('mobile', this.phone);
            formData.append('verifyCode', this.imgVali);
            this.$http.post(api.url, formData)
                .then(function(res) {
                    if (!res.data.status) {
                        this.$valiLogin.imgvali.required = false;
                        cb && cb();
                        // _self.codeImg = res.data.data.img;
                    } else {
                        this.$valiLogin.imgvali.required = true;
                        // console.log(res.data.message);
                    }
                }, function(res) {
                    console.log(res);
                });
        },
        /**
         * getCode 获取验证码
         * @return {[type]} [description]
         */
        getCode: function(e) {
            var _self = this;
            this.$validate('phone', true, function() {
                _self.$validate('imgvali', true, function() {
                    if (_self.$valiLogin.phone.invalid || _self.$valiLogin.imgvali.invalid) {
                        e.preventDefault();
                    } else if (!_self.token) {
                        _self.getToken(function(token){
                            _self.token = token;
                        });
                    } else {
                        _self.verifyCodeImg(function() {
                            _self.bGettingCode = true;
                            _self.countdownFn();
                            var api = {
                                url: '/api/d11/loginsms?token=' + _self.token,
                                // params: {
                                //     mobile: _self.phone,
                                //     verifyCode: _self.imgVali
                                // }
                            };
                            var formData = new FormData();
                            formData.append('mobile', _self.phone);
                            formData.append('verifyCode', _self.imgVali);
                            _self.$http.post(api.url, formData)
                                .then(function(res) {
                                    if (!res.data.status) {
                                        // _self.codeImg = res.data.data.img;
                                    } else {
                                        console.log(res.data.message);
                                    }
                                }, function(res) {
                                    console.log(res);
                                });

                        });

                    }
                });
            });
        },
        countdownFn: function() {
            var _self = this;
            this.countdownTime = setInterval(function() {
                _self.countdown--;
                if (_self.countdown <= 0) {
                    clearInterval(_self.countdownTime);
                    _self.bGettingCode = false;
                    _self.countdown = 30;
                }
            }, 1000);
        }
    }
});
