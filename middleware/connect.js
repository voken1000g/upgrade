export default async function({ store, app, redirect }) {
  if (store.state.web3Ready) {
    if (!store.state.account) {
      await store.dispatch('CONNECT_WEB3')
    }

    if (store.state.account) {
      await store.state.dApp.getChainId()

      if (store.state.isMainNet) {
        redirect(app.localePath('/'))
        return null
      }
    }

    // chain changed
    await window.ethereum.on('chainChanged', async function (chainId) {
      await store.dispatch('SYNC_CHAIN_ID', parseInt(chainId))

      if (store.state.isMainNet) {
        redirect(app.localePath('/'))
        return null
      }
    })
  }
}
