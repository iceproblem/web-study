var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/todos', function(req, res, next) {
   res.json({
     status: 200,
     data: [
       {id: 0, content: "redux", done: false},
       {id: 1, content: "react", done: false},
       {id: 2, content: "react-redux", done: false},
       {id: 3, content: "umi", done: false}
     ]
   })
});

module.exports = router;
