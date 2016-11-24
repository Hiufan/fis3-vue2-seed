'use strict';
/**
 * city.js
 * @version 1.0
 * @description 动态模拟数据示例
 * @author Xxx
 */

module.exports = function(req, res, next) {
    var mock_data = {
        status: 0,
        message: "",
        error: {

        },
        data: [{
            areaId: "62",
            areaName: "兰州",
            shops: [{
                shopId: "3",
                shopName: "兰州捷安特店1"
            }, {
                shopId: "5",
                shopName: "兰州捷安特店2"
            }]
        }, {
            areaId: "76",
            areaName: "广州",
            shops: [{
                shopId: "4",
                shopName: "广州捷安特店"
            }]
        }]
    };
    res.send(mock_data);
};
