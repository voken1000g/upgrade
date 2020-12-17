import BigNumber from 'bignumber.js'
import upgradeAbi from './constants/resaleOrUpgradeToVokenTB.json'

class DApp {
  constructor(state, commit) {
    this._state = state
    this._commit = commit
  }

  async getChainId() {
    await window.web3.eth.getChainId().then(chainId => {
      this._commit('SET_CHAIN_ID', chainId)
    })
  }

  async setUpgradeContract() {
    const Contract = window.web3.eth.Contract

    this._commit('SET_UPGRADE_CONTRACT', new Contract(upgradeAbi, this._state.upgradeContractAdds))
  }

  async getStatus() {
    await this._state
      .upgradeContract()
      .methods
      .status()
      .call()
      .then(payload => {
        let status = {
          deadline: parseInt(payload.deadline),
          usdAudit: new BigNumber(payload.usdAudit),
          usdClaimed: new BigNumber(payload.usdClaimed),
          usdReceived: new BigNumber(payload.usdReceived),
          resaleEtherUSDPrice: new BigNumber(payload.resaleEtherUSD),
          v1Claimed: new BigNumber(payload.v1Claimed),
          v1Bonuses: new BigNumber(payload.v1Bonuses),
          v2Claimed: new BigNumber(payload.v2Claimed),
          v2Bonuses: new BigNumber(payload.v2Bonuses),
          vokenTbTotal: new BigNumber(payload.v1Claimed).plus(payload.v1Bonuses).plus(payload.v2Claimed).plus(payload.v2Bonuses),
          etherUSDPrice: new BigNumber(payload.etherUSD),
          vokenUSDPrice: new BigNumber(payload.vokenUSD)
        }

        this._commit('SET_STATUS', status)
      })
      .catch(error => {
        console.error('::: [dApp] status', error)
      })
  }

  async getAccountStatus() {
    await this._state
      .upgradeContract()
      .methods
      .getAccountStatus(this._state.account)
      .call()
      .then(payload => {
        let status = {
          canOnlyResale: payload.canOnlyResale,
          v1ResaleAppliedTimestamp: parseInt(payload.v1ResaleAppliedTimestamp),
          v2ResaleAppliedTimestamp: parseInt(payload.v2ResaleAppliedTimestamp),
          v1UpgradeAppliedTimestamp: parseInt(payload.v1UpgradeAppliedTimestamp),
          v2UpgradeAppliedTimestamp: parseInt(payload.v2UpgradeAppliedTimestamp),
          v1Balance: new BigNumber(payload.v1Balance),
          v2Balance: new BigNumber(payload.v2Balance),
          etherBalance: new BigNumber(payload.etherBalance)
        }

        this._commit('SET_ACCOUNT_STATUS', status)
      })
      .catch(error => {
        console.error('::: [dApp] account status', error)
      })
  }

  async getV1ResaleStatus() {
    await this._state.upgradeContract().methods.v1ResaleStatus(this._state.account)
      .call()
      .then(payload => {
        let status = {
          usdQuota: new BigNumber(payload.usdQuota),
          usdAudit: new BigNumber(payload.usdAudit),
          usdClaimed: new BigNumber(payload.usdClaimed),
          timestamp: parseInt(payload.timestamp),
        }

        this._commit('SET_V1_RESALE_STATUS', status)
      })
      .catch(error => {
        console.error('::: [dApp] getV1ResaleStatus', error)
      })
  }

  async getV2ResaleStatus() {
    await this._state.upgradeContract().methods.v2ResaleStatus(this._state.account)
      .call()
      .then(payload => {
        let status = {
          usdQuota: new BigNumber(payload.usdQuota),
          usdAudit: new BigNumber(payload.usdAudit),
          usdClaimed: new BigNumber(payload.usdClaimed),
          timestamp: parseInt(payload.timestamp),
        }

        this._commit('SET_V2_RESALE_STATUS', status)
      })
      .catch(error => {
        console.error('::: [dApp] getV2ResaleStatus', error)
      })
  }

  async getV1UpgradeStatus() {
    await this._state.upgradeContract().methods.v1UpgradeStatus(this._state.account)
      .call()
      .then(payload => {
        let status = {
          weiPurchased: new BigNumber(payload.weiPurchased),
          weiRewarded: new BigNumber(payload.weiRewarded),
          weiAudit: new BigNumber(payload.weiAudit),
          txsIn: parseInt(payload.txsIn),
          txsOut: parseInt(payload.txsOut),
          claim: new BigNumber(payload.claim),
          bonus: new BigNumber(payload.bonus),
          etherUSDPrice: new BigNumber(payload.etherUSD),
          vokenUSDPrice: new BigNumber(payload.vokenUSD),
          timestamp: parseInt(payload.timestamp)
        }

        this._commit('SET_V1_UPGRADE_STATUS', status)
      })
      .catch(error => {
        console.error('::: [dApp] getV1UpgradeStatus', error)
      })
  }

  async getV2UpgradeStatus() {
    await this._state.upgradeContract().methods.v2UpgradeStatus(this._state.account)
      .call()
      .then(payload => {
        let status = {
          weiPurchased: new BigNumber(payload.weiPurchased),
          weiRewarded: new BigNumber(payload.weiRewarded),
          weiAudit: new BigNumber(payload.weiAudit),
          txsIn: parseInt(payload.txsIn),
          txsOut: parseInt(payload.txsOut),
          claim: new BigNumber(payload.claim),
          bonus: new BigNumber(payload.bonus),
          etherUSDPrice: new BigNumber(payload.etherUSD),
          vokenUSDPrice: new BigNumber(payload.vokenUSD),
          timestamp: parseInt(payload.timestamp)
        }

        this._commit('SET_V2_UPGRADE_STATUS', status)
      })
      .catch(error => {
        console.error('::: [dApp] getV2UpgradeStatus', error)
      })
  }
}

export default DApp
