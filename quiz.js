let Fernet = require('fernet')

let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
let message = 'gAAAAABcEDNI4OVPVXyoEsIbqPLcDK4cgsZpnoKH1K0IwjAkXiZjw7wST6au9lR80l0VmGTUQIH0Df3rdFE80N7zCMNDmUJefgSJccqxd3VwgIp_GToXXCWEtjLMcO9xwt6Uegxs0O1VKLcZOM5XRRa7q2apcA-LYi8r9EBJ0S5LITxu1YwjsT4flfkoVhC0Mb3FQ1eG8_xE'
let token = new Fernet.Token({secret: secret, token: message, ttl:0})

console.log(token.decode())