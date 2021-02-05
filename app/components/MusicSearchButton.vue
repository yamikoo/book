<template>
  <form class="form-inline my-2 my-lg-0" @submit.prevent>
    <input class="form-control mr-sm-2" type="search" placeholder="音楽を探す" aria-label="Search" maxlength="50" v-model="inputText" />
    <button class="btn btn-outline-success my-2 my-sm-0" type="" @click="search">検索</button>
  </form>
</template>

<style scoped>
.form-control {
  width: 200px;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data: function () {
    return {
      inputText: '',
    };
  },
  mounted: async function () {
    this.inputText = this.searchText;
  },
  methods: {
    ...mapActions('common', ['setStoreState']),
    ...mapActions('common', ['setBookList']),
    search: async function () {
      console.log(this.inputText);
      if (!this.inputText) return;
      const endpoint = 'http://localhost:3333/api/music?country=jp&media=music&entity=musicTrack&lang=ja_jp&limit=10';
      const apidata = await axios
        .get(`${endpoint}&term=${this.inputText}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      console.log(apidata);
      this.setStoreState('music');
      this.setBookList(apidata.results);
    },
  },
  computed: {
    ...mapGetters('common', ['searchText']),
  },
};
</script>
