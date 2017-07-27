var express = require('express')
var port = process.env.PORT || 80
var app = express()
var router = express.Router()

app.use(router)
// 只用于开发环境

if ('development' == app.get('env')) {
  console.log( app.get('env'))
  port = 3001
}

// 只用于生产环境
if ('production' == app.get('env')) {
  console.log( app.get('env'))
  app.use(express.static('./dist'))
}

var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('cookie-session')
var superagent = require('superagent')
var server = app.listen(port)
console.log('program started on port'+ port)

var User = require('../server/models/user.js')
mongoose.Promise = require('bluebird')
global.db = mongoose.connect("mongodb://localhost:27017/chatRoom",{useMongoClient: true})

//服务器数据json化
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  name: 'test',
  secret: 'SHIVER',
  maxAge: null, // 24 hours
  resave: false,
  saveUninitialized: false
}))

//注册
app.post('/user/signup', function (req, res) {
  var _user = req.body
  console.log(_user)
  User.findOne({name: _user.name}, function (err, user) {
    if (err) {
      console.log(err)
    }
    if (user) {
      res.json({
        res_code: 0,
        res_msg: '这个名字已经被人取啦！'
      })
    } else {
      var user = new User(_user)
      user.save(function (err, user) {
        if (err) {
          console.log(err)
        }
        res.json({
          res_code: 1,
          res_msg: '注册成功啦！'
        })
      })
    }
  })
})

// 登录
app.post('/user/login', function (req, res) {
    var _user = req.body
    var name = _user.name
    var password = _user.password
    User.findOne({name: name}, function (err, user) {
      console.log(user)
      if (err) {
        console.log(err)
      }
      if (!user) {
        res.json({
          res_code: 0,
          res_msg: '账号或密码错误' //用户不存在
        })
      } else {
        if (!!password) {
          user.comparePassword(password, function (err, isMatch) {
            if (err) {
              console.log(err)
            }
            if (isMatch) {
              req.session.user = user
              console.log('success')
              res.json({
                res_code: 1,
                res_msg: '登录成功',
                info: {
                  name: name,
                  src: user.src,
                  _id: req.session.user._id
                }
              })
            } else {
              res.json({
                res_code: 2,
                res_msg: '账号或密码错误'
              })
              console.log('password is not meached')
            }
          })
        } else {
          res.json({
            res_code: 4,
            res_msg: '登录失败'
          })
        }
      }
    })
  })

//登陆控制
app.use(function (req, res, next) {
    var o_url = req.originalUrl
    console.log('########以下是session#######')
    console.log(req.session)
    if (o_url != "/login" && req.session.user == undefined) {
      res.json({
        res_code: 0,
        res_msg: '请登录'
      })
    }else{
      next()
    }
})

app.get('/test', function (req, res) {
  var Message = require('./models/message.js')
  var message = new Message
  console.log('以下是Message对象')
  console.log(typeof(Message))
  console.log('以下是message对象')
  console.log(typeof(message))
  res.json({
    res_msg: '我就试试啊'
  })
})

//退出
app.post('/user/logout', function (req, res) {
  req.session = null
  if (req.session === null) {
      res.json({
        res_code: 1
      })
    }else{
      res.json({
        res_code: 0,
        res_msg: '退出失败，请重试~'
      })
    }

})

// 机器人消息
app.get('/robotapi', function(req, res) {
  console.log(req.session)
  var response = res
  var info = req.query.info
  var userid = req.query.id
  var key = 'fde7f8d0b3c9471cbf787ea0fb0ca043'
  superagent.post('http://www.tuling123.com/openapi/api')
    .send({info, userid, key})
    .end((err, res) => {
      if(err){
        console.log(err)
      }

      var reg = new RegExp("小\?图图","g")
      var newstr = res.text.replace(reg,"小蘑菇")  

      response.json({
        data: newstr
      })

    })
})

// 获取历史信息
app.get('/message',function (req, res) {
  Message.find({}, function (err, message) {
    if(err) {
      console.log(err)
    } else{
      res.json({
        res_code: 1,
        res_msg: '',
        infos: message
      })
    }
  })
})

//websocket
var io = require('socket.io')(server)
var Message = require('./models/message.js')
var user = {}
io.on('connection', function (socket) {

  socket.on('message', function (obj) {
    io.emit('message', obj)
    var mess = {
      username: obj.username,
      src: obj.src,
      msg: obj.msg,
      roomid: 'room1'
    }

    var message = new Message(mess)
    //将发送过来的消息进行储存
    message.save(function (err, mess) {
      if (err) {
        console.log(err)
      }
        console.log(mess)
    })
    console.log(obj.username + '说：' + obj.msg)

  })

  socket.on('login', function (obj) {
    console.log('login——>obj')
    console.log(obj)
  socket.name = obj.name
  users[obj.name] = obj
    //用于监听用户进行聊天室
    io.emit('login', users)
  })

  /*socket.on('logout',function (name) {
    console.log('logout——>name')
    console.log(name)
    delete users[name]
    //用户监听用退出聊天室
    io.emit('logout', users)
  })

  socket.on('disconnect', function () {
    console.log('disconnect——>socket')
    console.log(socket)
    delete users[socket.name]
    //用户监听用退出聊天室
    io.emit('logout', users)
  })*/

})