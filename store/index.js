import BigNumber from 'bignumber.js'
import detectEthereumProvider from '@metamask/detect-provider'
import DApp from '../utils/dapp'

export const state = () => ({
  web3Ready: typeof window.ethereum !== 'undefined',
  chainId: null,
  isMainNet: null,
  account: null,

  blockNumber: 0,

  status: {
    deadline: 0,

    usdAudit: new BigNumber(0),
    usdClaimed: new BigNumber(0),
    usdReceived: new BigNumber(0),

    resaleEtherUSDPrice: new BigNumber(0),

    v1Claimed: new BigNumber(0),
    v1Bonuses: new BigNumber(0),
    v2Claimed: new BigNumber(0),
    v2Bonuses: new BigNumber(0),

    vokenTbTotal: new BigNumber(0),

    etherUSDPrice: new BigNumber(0),
    vokenUSDPrice: new BigNumber(0)
  },

  deadlineCountdown: {
    interval: null,

    d: '0',
    hh: '00',
    mm: '00',
    ss: '00',
  },

  accountStatus: {
    canOnlyResale: false,
    v1ResaleAppliedTimestamp: 0,
    v2ResaleAppliedTimestamp: 0,
    v1UpgradeAppliedTimestamp: 0,
    v2UpgradeAppliedTimestamp: 0,
    v1Balance: new BigNumber(0),
    v2Balance: new BigNumber(0),
    etherBalance: new BigNumber(0)
  },

  v1ResaleStatus: {
    usdQuota: new BigNumber(0),
    usdAudit: new BigNumber(0),
    usdClaimed: new BigNumber(0),
    timestamp: 0
  },

  v2ResaleStatus: {
    usdQuota: new BigNumber(0),
    usdAudit: new BigNumber(0),
    usdClaimed: new BigNumber(0),
    timestamp: 0
  },

  v1UpgradeStatus: {
    weiPurchased: new BigNumber(0),
    weiRewarded: new BigNumber(0),
    weiAudit: new BigNumber(0),
    txsIn: 0,
    txsOut: 0,
    claim: new BigNumber(0),
    bonus: new BigNumber(0),
    etherUSDPrice: new BigNumber(0),
    vokenUSDPrice: new BigNumber(0),
    timestamp: 0
  },

  v2UpgradeStatus: {
    weiPurchased: new BigNumber(0),
    weiRewarded: new BigNumber(0),
    weiAudit: new BigNumber(0),
    txsIn: 0,
    txsOut: 0,
    claim: new BigNumber(0),
    bonus: new BigNumber(0),
    etherUSDPrice: new BigNumber(0),
    vokenUSDPrice: new BigNumber(0),
    timestamp: 0
  },

  upgradeContract: null,
  upgradeContractAdds: '0x00000004b941F37c39550B05c90280d11a14C88e',

  dApp: null,

  notForTheAddress: false
})


export const mutations = {
  SET_CHAIN_ID(state, chainId) {
    state.chainId = chainId
    state.isMainNet = chainId === 1
  },
  SET_ACCOUNT(state, account) {
    state.account = window.web3.utils.toChecksumAddress(account)
  },
  SYNC_BLOCK_NUMBER(state, blockNumber) {
    state.blockNumber = blockNumber
  },
  SET_DAPP(state, dApp) {
    state.dApp = dApp
  },
  SET_UPGRADE_CONTRACT(state, upgradeContract) {
    state.upgradeContract = function() {
      return upgradeContract
    }
  },

  SET_STATUS(state, status) {
    state.status = status
  },
  SET_ACCOUNT_STATUS(state, status) {
    state.accountStatus = status
    state.notForTheAddress = (
      state.accountStatus.v1ResaleAppliedTimestamp === 0
      &&
      state.accountStatus.v1UpgradeAppliedTimestamp === 0
      &&
      state.accountStatus.v2ResaleAppliedTimestamp === 0
      &&
      state.accountStatus.v2UpgradeAppliedTimestamp === 0
      &&
      state.accountStatus.v1Balance.eq(0)
      &&
      state.accountStatus.v2Balance.eq(0)
    )
  },

  SET_V1_RESALE_STATUS(state, status) {
    state.v1ResaleStatus = status
  },
  SET_V2_RESALE_STATUS(state, status) {
    state.v2ResaleStatus = status
  },
  SET_V1_UPGRADE_STATUS(state, status) {
    state.v1UpgradeStatus = status
  },
  SET_V2_UPGRADE_STATUS(state, status) {
    state.v2UpgradeStatus = status
  },

  DEADLINE_COUNTDOWN(state) {
    let diff = state.status.deadline * 1000 - new Date().getTime()

    if (diff > 0) {
      const s = Math.floor(diff / 1000 % 60)
      const m = Math.floor(diff / 60000 % 60)
      const h = Math.floor(diff / 1440000 % 24)
      const d = Math.floor(diff / 86400000)

      const ss = s < 10 ? '0' + s : s
      const mm = m < 10 ? '0' + m : m
      const hh = h < 10 ? '0' + h : h

      state.deadlineCountdown.ss = ss
      state.deadlineCountdown.mm = mm
      state.deadlineCountdown.hh = hh
      state.deadlineCountdown.d = d
    } else {
      state.deadlineCountdown.ss = '00'
      state.deadlineCountdown.mm = '00'
      state.deadlineCountdown.hh = '00'
      state.deadlineCountdown.d = '0'
    }
  },
  SET_DEADLINE_COUNTDOWN_INTERVAL(state, payload) {
    state.deadlineCountdown.interval = payload
  },
}


export const actions = {
  async CONNECT_WEB3({ commit, state }) {
    const provider = await detectEthereumProvider()
    if (provider) {
      ethereum.autoRefreshOnNetworkChange = false
      window.web3 = new Web3(window.ethereum)

      await provider
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          commit('SET_ACCOUNT', accounts[0])
          commit('SET_DAPP', new DApp(state, commit))
        })
        .catch(error => {
          this.$toast.error(error.message)
        })
      } else {
        this.$toast.error('Cannot find any web3 provider')
      }
  },
  async SYNC_CHAIN_ID({ commit }, chainId) {
    commit('SET_CHAIN_ID', parseInt(chainId))
  },
  async SYNC_ACCOUNT({ commit }, account) {
    commit('SET_ACCOUNT', account)
  },
  async SYNC_BLOCK_NUMBER({ commit }, blockNumber) {
    commit('SYNC_BLOCK_NUMBER', blockNumber)
  },
  async DEADLINE_COUNTDOWN({ commit }) {
    commit('DEADLINE_COUNTDOWN')
  },
  async SET_DEADLINE_COUNTDOWN_INTERVAL({ commit }, payload) {
    commit('SET_DEADLINE_COUNTDOWN_INTERVAL', payload)
  }
}
