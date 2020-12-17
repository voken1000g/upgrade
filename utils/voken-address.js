import * as crypto from 'crypto'
import base32 from './base32'

const prvKeyToPubKey = function(prvKey) {
  const ecdh = crypto.createECDH('secp256k1');
  ecdh.setPrivateKey(prvKey,'hex');
  return ecdh.getPublicKey(null, 'compressed')
}

const pubToAddr20 = function(pubKey) {
  return crypto.createHash('sha256').update(pubKey).digest().slice(-20)
}

const addr20ToAddr32 = function(addr20) {
  return base32.encode(addr20)
}

const addr32ToAddress = function(addr32) {
  let address = 'v'
  let hash = crypto.createHash('sha256').update(addr32).digest()
  let addr32Array = addr32.split('')
  addr32Array.forEach(function(c, i) {
    if (hash[i] > 127) {
      address = address + c.toUpperCase()
    } else {
      address = address + c
    }
  })

  return address
}

const pubToAddress = function(pubKey) {
  let addr20 = pubToAddr20(pubKey)
  let addr32 = addr20ToAddr32(addr20)

  return addr32ToAddress(addr32)
}

const prvToAddress = function(prvKey) {
  const pubKey = prvKeyToPubKey(prvKey)
  return pubToAddress(pubKey)
}

const isAddress = function(address) {
  if (address.length !== 33) {
    return false
  }

  if (address.slice(0, 1) !== 'v') {
    return false
  }

  let addr32 = address.slice(1).toLowerCase()
  let _address = addr32ToAddress(addr32)

  return (address === _address)
}

const isPrivateKey = function(prvKey) {
  const regHex = new RegExp('(^[a-f0-9]{64}$)')
  return regHex.test(prvKey)
}

const vokenAddress = {
  pubToAddress: pubToAddress,
  prvToAddress: prvToAddress,
  isAddress: isAddress,
  isPrivateKey: isPrivateKey
}

export default vokenAddress
