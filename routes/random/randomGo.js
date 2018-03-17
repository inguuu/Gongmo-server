var express = require('express');
var router = express.Router();

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')
const db = require('../../module/pool'); //createPool을 해서 여러 개의 connection을 가져온 상태 

router.post('/', async (req, res) => {
    console.log(req.body);
    var selectQuery;
    if (req.body.place == '5') {
        selectQuery = 
        'SELECT * FROM BusinessInfo WHERE (category =? OR category =? OR category =?)AND cost =?'
    } else {
        selectQuery = 
        'SELECT * FROM BusinessInfo WHERE (category =? OR category =? OR category =?)AND cost =? AND place=?';
    }

    const selectResult = 
    await db.queryParam_Parse(selectQuery,
         [req.body.category1, req.body.category2, req.body.category3, req.body.cost, req.body.place]);

    if (!selectResult) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "DB오류"));
    } else { //쿼리문이 성공했을 때
        if (selectResult[0] == null) {
            res.status(200).send(defaultRes.successFalse(statusCode.OK, "매칭실패"));
        } else {
            let resData = []
            let first = [];
            let second = [];
            let third = [];

            for (let i = 0; i < selectResult.length; i++) {
                if (selectResult[i].category == req.body.category1) {
                    first.push(selectResult[i]);
                } else if (selectResult[i].category == req.body.category2) {
                    second.push(selectResult[i]);
                } else if (selectResult[i].category == req.body.category3) {
                    third.push(selectResult[i]);
                }
            }
            resData = first.concat(second, third);
            console.log(resData);
            res.status(200).send(defaultRes.successTrue(statusCode.OK, "매칭성공", resData));
        }

    }
});



module.exports = router;