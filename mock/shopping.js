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
        "status": 0,
        "message": "",
        "error": {

        },
        "data": {
            "actId": "546",
            "actType": "1",
            "systemTime": "1476855440",
            "subjectId": "s123",
            "actList": [{
                "actId": "545",
                "actType": "1",
                "startTime": "1476855460",
                "endTime": "1476858450",
                "actTitle": "0.01元疯抢0.01元疯抢"
            }, {
                "actId": "546",
                "actType": "2",
                "startTime": "1476855450",
                "endTime": "1486858450",
                "actTitle": "7折抢购"
            }, {
                "actId": "547",
                "actType": "2",
                "startTime": "1576855450",
                "endTime": "1676858450",
                "actTitle": "7折抢购"
            }],

            "salesList": [
                {
                    "saleId": "123",
                    "brandId": "b123",
                    "salesName": "胜利V1胜利V1胜利V1200山地车",
                    "salesImg": "../../../assets/images/brand.png",
                    "salesType": "1",
                    "salesMarketPrice": "4810",
                    "salesDiscountPrice": "4199",
                    "salesGift": ""
                }, {
                    "saleId": "123",
                    "brandId": "b123",
                    "salesName": "胜利V1胜利V1胜利V1200山地车",
                    "salesImg": "../../../assets/images/brand.png",
                    "salesType": "2",
                    "salesMarketPrice": "4810",
                    "salesDiscountPrice": "4199",
                    "salesGift": "0.01元抢购"
                }
            ]
        }
    };
    res.send(mock_data);
};
