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
            token: '1_edadb716efad0a7fa3be5f9da3b86e8a'
        }
    };
    res.send(mock_data);
};
