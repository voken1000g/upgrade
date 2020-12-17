import BigNumber from 'bignumber.js'

const chainNameFromId = function(chainId) {
  switch (chainId) {
    case 1:
      return 'MainNet'
    case 3:
      return 'Ropsten'
    case 4:
      return 'Rinkeby'
    case 5:
      return 'Goerli'
    case 42:
      return 'Kovan'
    default:
      return 'Unknown'
  }
}

const simplifyAddress = function(address) {
  if (address) {
    return address.slice(0, 6) + '...' + address.slice(38)
  }

  return null
}

const amountDisplay = function(amount, decimals = 6, fixed = 0) {
  let bn = new BigNumber(amount).div(10 ** decimals)
  if (fixed > 0) {
    return bn.toFixed(fixed)
  } else {
    return bn
  }
}

const functions = {
  chainNameFromId: chainNameFromId,
  simplifyAddress: simplifyAddress,
  amountDisplay: amountDisplay
}

export default functions
