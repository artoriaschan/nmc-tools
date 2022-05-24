import crypto from 'crypto'
import { fetch } from '../utils/fetch'

export async function login(query: Record<string, any>) {
  query.cookie = query.cookie ?? {}
  query.cookie.os = 'pc'
  query.cookie.appver = '2.9.7'

  const data = {
    username: query.email,
    password:
      query.md5_password ||
      crypto.createHash('md5').update(query.password).digest('hex'),
    rememberLogin: 'true'
  }

  let result = await fetch('POST', `https://music.163.com/api/login`, data, {
    crypto: 'weapi',
    ua: 'desktop',
    cookie: query.cookie,
    proxy: query.proxy,
    realIP: query.realIP
  })

  if (result.body.code === 502) {
    return {
      status: 200,
      body: {
        msg: '账号或密码错误',
        code: 502,
        message: '账号或密码错误'
      }
    }
  }

  if (result.body.code === 200) {
    result = {
      status: 200,
      body: {
        ...result.body,
        cookie: result.cookie.join(';')
      },
      cookie: result.cookie
    }
  }
  return result
}
