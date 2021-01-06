export const state = () => ({
  menuMobile: false,
  languageMenu: false,
})


export const mutations = {
  TOGGLE_MENU_MOBILE(state) {
    state.menuMobile = !state.menuMobile
    state.languageMenu = false
  },
  TOGGLE_LANGUAGE_MENU(state) {
    state.menuMobile = false
    state.languageMenu = !state.languageMenu
  },
  HIDE_ALL(state) {
    state.menuMobile = false
    state.languageMenu = false
  },
}


export const actions = {
  TOGGLE_MENU_MOBILE({ commit }) {
    commit('TOGGLE_MENU_MOBILE')
  },
  TOGGLE_LANGUAGE_MENU({ commit }) {
    commit('TOGGLE_LANGUAGE_MENU')
  },
  HIDE_ALL({ commit }) {
    commit('HIDE_ALL')
  }
}
