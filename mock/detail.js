'use strict';
/**
 * news.js
 * @version 1.0
 * @description 动态模拟数据示例
 * @author Xxx
 */

module.exports = function(req, res, next) {
    var mock_data = {
        "status": 0,
        "message": "",
        "error": {},
        "data": {
            "saleId": "1",
            "productId": "3",
            "salesName": "2016 Defy 3",
            "salesImg": "http://ctest.biketo.com/hd-biketo-com/brand/201610/580618906cfe1.jpg",
            "salesMarketPrice": "3898.00",
            "salesDiscountPrice": "3398.00",
            "salesGift": "aa",
            "salesType": "1",
            "salesContent": "<img src='http://ctest.biketo.com/hd-biketo-com/brand/201610/580618906cfe1.jpg'/>"
        }
    };
    res.send(mock_data);
};
