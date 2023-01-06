module.exports = {
  '/api': {
    'target': 'http://10.15.111.13:9096/',
    'changeOrigin': true,
    'pathRewrite': { '^/api' : '' },
    'cookieDomainRewrite': {
      "JSESSIONID": '431AD70363BC96EB6685453F274C7205',
      'token': 'eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY3MjIwOTEyMTIyOSwidXNlcklkIjoiMTIzNDU2Nzg5MCJ9.okH7TMfAXretEvZt_P_QyxDFi5smasWyRWWBwefJkuY' 
    }
  },
}