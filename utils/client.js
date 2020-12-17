import request from './axios'

export function getVersion() {
  let url = '/rpc/version'

  return request({
    url: url,
    method: 'get'
  })
}


export function getInitialization() {
  let url = '/rpc/initialization'

  return request({
    url: url,
    method: 'get'
  })
}

export function postInitialization(privateKey, socksPort) {
  let url = '/rpc/initialization'

  return request({
    url: url,
    method: 'post',
    params: {
      private_key: privateKey,
      local_socks_port: socksPort
    }
  })
}


export function getAppContainers() {
  let url = '/rpc/app-containers'

  return request({
    url: url,
    method: 'get'
  })
}

export function getConnection() {
  let url = '/rpc/connection'

  return request({
    url: url,
    method: 'get'
  })
}

export function postConnection(address) {
  let url = '/rpc/connection'

  return request({
    url: url,
    method: 'post',
    params: {
      wallet_address: address
    }
  })
}

export function deleteConnection(address) {
  let url = '/rpc/connection'

  return request({
    url: url,
    method: 'delete'
  })
}

export function getLocalWallet() {
  let url = '/rpc/local-wallet'

  return request({
    url: url,
    method: 'get'
  })
}

export function getLocalWalletBalance() {
  let url = '/rpc/local-wallet-balance'

  return request({
    url: url,
    method: 'get'
  })
}

export function getLocalWalletSetting() {
  let url = '/rpc/getLocalWalletSetting'

  return request({
    url: url,
    method: 'get'
  })
}

export function putLocalWallet(privateKey) {
  let url = '/rpc/local-wallet'

  return request({
    url: url,
    method: 'put',
    params: {
      private_key: privateKey
    }
  })
}

export function getNews() {
  let url = '...'

  return request({
    url: url,
    method: 'get'
  })
}



export function getTransactions(template = '0x0001', limit = 30, offset = 0) {
  let url = '/rpc/transaction-logs?template_address=' + template

  return request({
    url: url,
    method: 'get'
  })
}

export function postTransaction(address, amount) {
  let url = '/rpc/transaction'

  return request({
    url: url,
    method: 'post',
    params: {
      target_wallet_address: address,
      amount: amount
    }
  })
}

export function getProxyType() {
  let url = '/rpc/getProxyType'

  return request({
    url: url,
    method: 'get'
  })
}

export function getLocalSocksPort() {
  let url = '/rpc/local-socks-port'

  return request({
    url: url,
    method: 'get'
  })
}

export function putLocalSocksPort(port) {
  let url = '/rpc/local-socks-port'

  return request({
    url: url,
    method: 'put',
    params: {
      port: port
    }
  })
}

export function setProxyType(proxyType) {
  let url = '/rpc/setProxyType?proxyType={proxyType}'.format(proxyType)

  return request({
    url: url,
    method: 'get'
  })
}

export function getMQ() {
  let url = '/rpc/message-queue'

  return request({
    url: url,
    method: 'get'
  })
}
