let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
let models = require('./db')
let mysql = require('mysql')
let connection = mysql.createConnection(models.mysql)
connection.connect()

router.get('/getTask', (req, res) => {
    let list = []
    connection.query('select * from tasks', (err, result) => {
        if (err) throw err
        list = result
        res.writeHeader(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        })
        let data = {
            code: 1,
            msg: '查询成功',
            data: list
        }
        res.end(JSON.stringify(data))
    })
})

router.post('/addTask', jsonParser, (req, res) => {
    let params = ''
    let sql = '';
    if (req.body.id) {
        sql = 'update Tasks set name=?,color=? where id=?';
        params = [req.body.name, req.body.color, req.body.id]
    } else {
        sql = 'insert into Tasks(name,color) values(?,?)'
        params = [req.body.name, req.body.color]
    }
    connection.query(sql, params, (err, result) => {
        if (err) throw err
        let data = {
            code: 1,
            msg: req.body.id ? '修改成功' : '添加成功'
        }
        res.writeHeader(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        res.end(JSON.stringify(data))
    })
})

router.post('/deleteTask', jsonParser, (req, res) => {
    connection.query('delete from tasks where id=' + req.body.id, (err, result) => {
        if (err) throw err
        connection.query('delete from todos where task_id=' + req.body.id, (err, result) => {
            let data = {
                code: 1,
                msg: '删除成功'
            }
            res.writeHeader(200, {
                'Content-Type': 'text/plain;charset=utf-8'
            });
            res.end(JSON.stringify(data))
        })
    })
})

router.post('/addTodo', jsonParser, (req, res) => {
    let params = ''
    let sql = '';
    if (req.body.id) {
        sql = 'update todos set name=?,color=? where id=?';
        params = [req.body.name, req.body.color, req.body.id]
    } else {
        sql = 'insert into todos(task_id,title) values(?,?)'
        params = [req.body.task_id, req.body.title]
    }
    connection.query(sql, params, (err, result) => {
        if (err) throw err
        let data = {
            code: 1,
            msg: req.body.id ? '修改成功' : '添加成功'
        }
        res.writeHeader(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        res.end(JSON.stringify(data))
    })
})

router.get('/getTodos', (req, res) => {
    let list = []
    let task_name = '';
    connection.query(`select name from tasks where id = ${req.query.task_id}`, (err, result) => {
        if (err) throw err
        task_name = result[0].name
        callback()
    })

    function callback() {
        connection.query(`select * from todos where task_id = ${req.query.task_id}`, (err, result) => {
            if (err) throw err
            list = result
            res.writeHeader(200, {
                'Content-Type': 'text/plain;charset=utf-8'
            });
            let reData = {
                code: 1,
                msg: '查询成功',
                data: {
                    task_name,
                    list
                }
            }
            res.end(JSON.stringify(reData))
        })
    }

})

router.post('/deleteTodo', jsonParser, (req, res) => {
    connection.query('delete from todos where id=' + req.body.id, (err, result) => {
        if (err) throw err
        let data = {
            code: 1,
            msg: '删除成功'
        }
        res.writeHeader(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        res.end(JSON.stringify(data))
    })
})

router.post('/updateTodo', jsonParser, (req, res) => {
    let id = req.body.id;
    let keys = Object.keys(req.body)
    let params = []
    let sql = 'update todos set '
    keys.shift()
    keys.map((item, index) => {
        sql += `${item}=?${(index+1) === keys.length && keys.length ? '' : ','}`
        params.push(req.body[item])
    })
    sql += ` where id=?`
    params.push(id)
    connection.query(sql, params, (err, result) => {
        if (err) throw err
        let data = {
            code: 1,
            msg: '修改成功'
        }
        res.writeHeader(200, { 'Content-Type': 'text/plain;charset=utf-8' })
        res.end(JSON.stringify(data))
    })
})

module.exports = router