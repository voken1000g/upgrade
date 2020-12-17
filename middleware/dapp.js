export default async function({ store, app, redirect }) {
  if (!store.state.web3Ready) {
    redirect(app.localePath('/no-web3'))
    return null
  }

  if (!store.state.account) {
    await store.dispatch('CONNECT_WEB3')
  }

  if (store.state.web3Ready && !store.state.account) {
    redirect(app.localePath('/connect'))
    return null
  }

  // chain id, confirm
  await store.state.dApp.getChainId()
  if (!store.state.isMainNet) {
    redirect(app.localePath('/mainnet-only'))
    return null
  }

  await store.state.dApp.setUpgradeContract()
  await store.state.dApp.getStatus()
  await store.state.dApp.getAccountStatus()

  // block number +
  await window.web3.eth
    .subscribe('newBlockHeaders')
    .on('data', async blockHeader => {
      if (blockHeader.number > store.state.blockNumber + 4) {
        await store.dispatch('SYNC_BLOCK_NUMBER', blockHeader.number)
        await store.state.dApp.getStatus()
      }
    })

  // accounts changed
  await window.ethereum.on('accountsChanged', async function (accounts) {
    await store.dispatch('SYNC_ACCOUNT', accounts[0])
    if (store.state.account) {
      await store.state.dApp.getAccountStatus()
    } else {
      redirect(app.localePath('/connect'))
    }
  })

  // chain changed
  await window.ethereum.on('chainChanged', async function (chainId) {
    await store.dispatch('SYNC_CHAIN_ID', parseInt(chainId))
    if (!store.state.isMainNet) {
      redirect(app.localePath('/mainnet-only'))
      return null
    }
    if (store.state.account) {
      await store.state.dApp.getStatus()
      await store.state.dApp.getAccountStatus()
    } else {
      redirect(app.localePath('/connect'))
      return null
    }
  })

  // countdown
  const fnCountdown = async function() {
    store.dispatch('DEADLINE_COUNTDOWN')
  }

  if (!store.state.deadlineCountdown.interval) {
    await store.dispatch( 'SET_DEADLINE_COUNTDOWN_INTERVAL',
      window.setInterval(fnCountdown, 1000)
    )
  }
}
