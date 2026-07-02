const Cookie = {
  set,
  setAndExpire,
  get,
  deleteAll
}

function set (name = '', value = {}) {
  document.cookie = `${name}=${JSON.stringify(value)};path=/;`
}

function setAndExpire (name = '', value = {}, expiryTime = 0) {
  const now = new Date()
  const time = now.getTime()
  const expireTime = time + expiryTime * 1000
  now.setTime(expireTime)
  document.cookie = `${name}=${JSON.stringify(value)};expires=${now.toUTCString()};path=/`
}

function get (name = '') {
  try {
    const cookies = document.cookie.split(';')
    let formCookie = ''
    cookies.forEach((cookie) => {
      cookie = cookie.trim()
      if (cookie.startsWith(`${name}=`)) {
        formCookie = cookie.replace(`${name}=`, '')
      }
    })
    return JSON.parse(formCookie)
  } catch (err) {
    return ''
  }
}

function deleteAll () {
  const cookies = document.cookie.split(';')
  cookies.forEach((cookie) => {
    cookie = cookie.trim()
    const name = cookie.split('=')[0]
    const now = new Date()
    document.cookie = `${name}='';expires=${now.toUTCString()};path=/`
  })
}

export default Cookie
