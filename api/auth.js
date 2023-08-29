import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'
import e from 'express'

// Create app
const app = express()

// Install middleware
app.use(cookieParser())
app.use(bodyParser.json())

// JWT middleware
app.use(
  jwt({
    secret: 'dummy',
    algorithms: ['sha1', 'RS256', 'HS256']
  }).unless({
    path: ['/api/auth/login', '/api/auth/refresh']
  })
)

// Refresh tokens
const refreshTokens = {}

// -- Routes --

// [POST] /login
app.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body

  var verifypwd = verify(req.body)
  console.log(verifypwd)
  // 判斷機制，如果為true，就會輸出error
  if (!verifypwd[0]) {
    throw new Error('輸入的帳號或密碼可能有誤!!!')
  }

  const expiresIn = 2592000 //使用者登入存活時間(s)
  // 產生亂數
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1

  // 輸出登入的使用者資訊，不存在cookie，而已每次通過中間件，存在$auth裡面
  const accessToken = jsonwebtoken.sign({
    username,
    picture: 'https://github.com/nuxt.png',
    name: username,
    scope: verifypwd[1],
  },
    'dummy', {
    expiresIn
  }
  )

  refreshTokens[refreshToken] = {
    accessToken,
    user: {
      username,
      picture: 'https://github.com/nuxt.png',
      name: 'User ' + username,
      propertyName: null //IMPORTANT
    }
  }

  res.json({
    token: {
      accessToken,
      refreshToken
    }
  })

  function verify(data) {
    const user = [{
      uid: 'admin',
      pwd: 'admin',
      permission: 'admin'
    },
    {
      uid: 'louis',
      pwd: '0000',
      permission: 'louis'
    },
    {
      uid: 'ray',
      pwd: '2011',
      permission: 'ray'
    },
    {
      uid: 'user',
      pwd: 'user',
      permission: 'user'
    }, {
      uid: 'viewer',
      pwd: 'viewer',
      permission: 'viewer'
    }
    ]
    const verify = user.find(element => element.uid === username)

    if (verify === undefined) {
      return [false]
    } else {
      if (verify.pwd === data.password) {
        // 判斷權限
        var permission = null
        if (verify.permission === 'admin') {
          permission = ['admin', 'user', 'viewer']
        } else if (verify.permission === 'user') {
          permission = ['user', 'viewer']
        } else if (verify.permission === 'viewer') {
          permission = ['viewer']
        }
        else if (verify.permission === 'louis') {
          permission = ['louis', 'admin', 'user', 'viewer']
        }
        else if (verify.permission === 'ray') {
          permission = ['ray', 'admin', 'user', 'viewer']
        }
        return [true, permission]
      } else {
        return [false]
      }
    }
  }
})


//暫時不會用到，這個是用來刷新token用的。
// app.post('/refresh', (req, res) => {
//   const { refreshToken } = req.body

//   if (refreshToken in refreshTokens) {
//     const user = refreshTokens[refreshToken].user
//     const expiresIn = 15
//     const newRefreshToken =
//       Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
//     delete refreshTokens[refreshToken]
//     const accessToken = jsonwebtoken.sign(
//       {
//         user: user.username,
//         picture: 'https://github.com/nuxt.png',
//         name: 'User ' + user.username,
//         scope: ['test', 'user']
//       },
//       'dummy',
//       {
//         expiresIn
//       }
//     )

//     refreshTokens[newRefreshToken] = {
//       accessToken,
//       user
//     }

//     res.json({
//       token: {
//         accessToken,
//         refreshToken: newRefreshToken
//       }
//     })
//   } else {
//     res.sendStatus(401)
//   }
// })

// [GET] /user
app.get('/user', (req, res) => {
  res.json({
    user: req.user
  })
})

// [POST] /logout
app.post('/logout', (_req, res) => {
  res.json({
    status: 'OK'
  })
})

// Error handler
app.use((err, _req, res) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

// -- export app --
export default {
  path: '/api/auth',
  handler: app
}
