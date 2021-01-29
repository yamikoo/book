export const state = () => ({
  searchText: '',
  searchList: [],
  searched: false,
  bookRegisted: false,
});

export const getters = {
  searchList: state => {
    return state.searchList;
  },
  searchText: state => {
    return state.searchText;
  },
  searched: state => {
    return state.searched;
  },
  bookRegisted: state => {
    return state.bookRegisted;
  },
};

export const actions = {
  setSearchList({ commit }, list) {
    commit('setSearchList', list);
  },
  setSearchText({ commit }, text) {
    commit('setSearchText', text);
  },
  setSearched({ commit }, bool) {
    commit('setSearched', bool);
  },
  setBookRegisted({ commit }, bool) {
    commit('setBookRegisted', bool);
  },
};

export const mutations = {
  setSearchList(state, list) {
    state.searchList = list;
  },
  setSearchText(state, text) {
    state.searchText = text;
  },
  setSearched(state, bool) {
    state.searched = bool;
  },
  setBookRegisted(state, bool) {
    state.bookRegisted = bool;
  },
};


