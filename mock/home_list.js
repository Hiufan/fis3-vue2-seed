'use strict';
/**
 * news.js
 * @version 1.0
 * @description 动态模拟数据示例
 * @author Xxx
 */

// var Mock = require('mockjs');
module.exports = function(req, res, next) {
    var mock_data = {
        status: 0,
        message: "",
        error: {

        },
        data: {
            actNextData: {
                hasNext: 1, //没有下一个活动时返回0
                data: {
                    actId: "2",
                    actTitle: "看车团2",
                    actType: "1",
                    subjectId: "1",
                    systemTime: 1476861473,
                    remainingTime: 1068127
                }
            },
            brandList: [{
                id: "1",
                actId: "1",
                brandId: "1",
                brandImg: "http://ctest.biketo.com/hd-biketo-com/brand/201610/580618906cfe1.jpg",
                brandName: "捷安特",
                brandDesc: "捷安特简介"
            }, {
                id: "2",
                actId: "1",
                brandId: "2",
                brandImg: "http://ctest.biketo.com/hd-biketo-com/brand/201610/5806193d99672.jpg",
                brandName: "捷安特",
                brandDesc: "捷安特简介"
            }, {
                id: "3",
                actId: "1",
                brandId: "3",
                brandImg: "http://ctest.biketo.com/hd-biketo-com/brand/201610/580715e78d810.jpg",
                brandName: "捷安特",
                brandDesc: "捷安特简介"
            }]
        }
    };
    res.send(mock_data);
};
