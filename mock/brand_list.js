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
            brandData: {
                id: "1",
                actId: "1",
                brandId: "1",
                brandImg: "http://ctest.biketo.com/hd-biketo-com/brand/201610/580618906cfe1.jpg",
                brandName: "捷安特",
                brandDesc: "作为中国专业运动自行车品牌的MISSILE，近十年来，一直致力于运动自行车的设计、研制及配套产品的开发。秉承对品质的卓越追求、对性能的精准优化，契合持续进步、快速发展的中国市场，不断推出行业领先的新产品。旗下多款运动、休闲钢架，竞赛级钪合金、高强度铝合金、钛合金以及碳纤维车架得到了广大车友的热烈追捧和专业车手的高度肯定。MISSILE品牌已经行销全国各省市以及全球10多个国家和地区，MISSILE也从一个车架零件品牌质变为一个更全面的知名运动自行车品牌。与此同时，MISSILE推出品牌中文名”米赛尔”与”MISSILE”同步推广，并提出了“骑行点亮生活，米赛尔单车”的骑行理念。"
            },
            saleList: [{
                saleId: 1,
                cate2Id: 2,
                salesName: "2016 Defy 3",
                brandId: 1,
                salesType: 1,
                salesNum: 0,
                salesMarketPrice: "3898.00",
                salesDiscountPrice: "3398.00",
                salesGift: "t",
                salesImg: "http://ctest.biketo.com/hd-biketo-com/brand/201610/580618906cfe1.jpg"
            },{
                saleId: 1,
                cate2Id: 2,
                salesName: "2016 Defy 3",
                brandId: 1,
                salesType: 4,
                salesNum: 0,
                salesMarketPrice: "3898.00",
                salesDiscountPrice: "3398.00",
                salesGift: "t",
                salesImg: "http://ctest.biketo.com/hd-biketo-com/brand/201610/580618906cfe1.jpg"
            }, {
                saleId: 2,
                cate2Id: 2,
                salesName: "2016 Defy ADV 3",
                brandId: 1,
                salesType: 3,
                salesNum: 0,
                salesMarketPrice: "7698.00",
                salesDiscountPrice: "6798.00",
                salesGift: "头盔",
                salesImg: "http://ctest.biketo.com/hd-biketo-com/brand/201610/580618906cfe1.jpg"
            }],
            actNextData: {
                hasNext: 1,
                data: {
                    actId: "2",
                    actTitle: "看车团2",
                    actType: "1",
                    subjectId: "1",
                    systemTime: 1476878131,
                    remainingTime: 1051469
                }
            }
        }
    };
    res.send(mock_data);
};
