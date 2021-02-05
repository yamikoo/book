import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex';
Vue.mixin({
  methods: {
    ...mapActions({
        commonSetSearchList: 'common/setSearchList',
        commonSetSearchText: 'common/setSearchText',
        commonSetSearched: 'common/setSearched',
        commonSetBookRegisted: 'common/setBookRegisted',
        commonSetBookList: 'common/setBookList',
        commonSetViewDetail: 'common/setViewDetail',
        commonSetSelectBook: 'common/setSelectBook',
        commonSetMainComponent: 'common/setMainComponent'
    }),
  },
  computed: {
    ...mapGetters({
        commonSearchList: 'common/searchList', 
        commonSearchText: 'common/searchText', 
        commonSearched: 'common/searched', 
        commonBookRegisted: 'common/bookRegisted', 
        commonBookList: 'common/bookList', 
        commonSelectBook: 'common/selectBook', 
        commonViewDetail: 'common/viewDetail', 
        commonMainComponent: 'common/mainComponent'
    }),
  },
})
