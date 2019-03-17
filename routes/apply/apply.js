var express = require('express');
var router = express.Router();

const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')
const db = require('../../module/pool'); //createPool을 해서 여러 개의 connection을 가져온 상태 
router.post('/', async (req, res) => {
    console.log(req.body);
    const insertQuery = 'INSERT INTO apply (busName,question1,question2,userIdx) VALUES (?,?,?,?) ';
    const insertResult = await db.queryParam_Parse(insertQuery, [req.body.busName, req.body.question1, req.body.question2, 0]);
})
router.get('/', async (req, res) => {

    const selectQuery = 'SELECT * FROM apply';
    const selectResult = await db.queryParam_Parse(selectQuery);
    res.json(selectResult)
})
router.get('/:busName', async (req, res) => {

    const selectQuery = 'SELECT * FROM apply WHERE busName = ? ';
    const selectResult = await db.queryParam_Parse(selectQuery, [req.params.busName]);
    res.json(selectResult)
})
router.get('/:busName/:useridx', async (req, res) => {//상세보기

    const selectQuery = 'SELECT * FROM apply WHERE busName = ? AND useridx=? ';
    const selectResult = await db.queryParam_Parse(selectQuery, [req.params.busName, req.params.useridx]);
    res.json(selectResult)
})
module.exports = router;