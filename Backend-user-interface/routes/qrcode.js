var express = require('express')
var router = express.Router();
var QRCode = require('qrcode');

router.get('/', (req, res, next) => {
    var code = QRCode.toString(req.query.test, {errorCorrectionLevel: 'H', type:'svg'}, function(err, data){
        if (err) throw err;
        console.log(req.query.test);
    })
    res.send(code);
});

module.exports = router;