// https://www.npmjs.com/package/base32-encode
// https://www.npmjs.com/package/base32-decode


const ALPHABET = '0123456789abcdefghjkmnpqrstuvwxy'

const encode = function(buffer) {
  let length = buffer.byteLength
  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < length; i++) {
    value = (value << 8) | buffer[i]
    bits += 8

    while (bits >= 5) {
      output += ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += ALPHABET[(value << (5 - bits)) & 31]
  }

  while ((output.length % 8) !== 0) {
    output += '='
  }

  return output
}


const readChar = function(char) {
  let idx = ALPHABET.indexOf(char)

  if (idx === -1) {
    throw new Error('Invalid character found: ' + char)
  }

  return idx
}


const decode = function(input) {
  input = input.replace(/=+$/, '')

  let length = input.length

  let bits = 0
  let value = 0

  let index = 0
  let output = new Uint8Array((length * 5 / 8) | 0)

  for (let i = 0; i < length; i++) {
    value = (value << 5) | readChar(input[i])
    bits += 5

    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 255
      bits -= 8
    }
  }

  return output
}


const base32 = {
  encode: encode,
  decode: decode
}

export default base32
