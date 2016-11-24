'use strict';
/**
 * token.js
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
            img: '../../../assets/images/valid.png'
        }
    };
    res.send(mock_data);
};
