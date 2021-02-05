export const state = () => ({
  storeState: '',
  searchText: '',
  searchList: [],
  searched: false,
  viewDetail: false,
  selectBook: {},
  bookList: [],
  bookRegisted: false,
  mainComponent: null,
});

export const getters = {
  storeState: state => {
    return state.storeState;
  },
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
  bookList: state => {
    return state.bookList;
  },
  selectBook: state => {
    return state.selectBook;
  },
  viewDetail: state => {
    return state.viewDetail;
  },
  mainComponent: state => {
    return state.mainComponent;
  },
};

export const actions = {
  setStoreState({ commit }, state) {
    commit('setStoreState', state);
  },
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
  setBookList({ commit }, books) {
    commit('setBookList', books);
  },
  setViewDetail({ commit }, bool) {
    commit('setViewDetail', bool);
  },
  setSelectBook({ commit }, book) {
    commit('setSelectBook', book);
  },
  setMainComponent({ commit }, component) {
    commit('setMainComponent', component);
  },
};

export const mutations = {
  setStoreState(state, data) {
    state.storeState = data;
  },
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
  setBookList(state, books) {
    state.bookList = books;
  },
  setViewDetail(state, bool) {
    state.viewDetail = bool;
  },
  setSelectBook(state, book) {
    state.selectBook = book;
  },
  setMainComponent(state, component) {
    state.mainComponent = component;
  },
};


