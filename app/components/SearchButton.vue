<template>
  <form class="form-inline my-2 my-lg-0" @submit.prevent>
    <input class="form-control mr-sm-2" type="search" placeholder="本を探す" aria-label="Search" maxlength="50" v-model="inputText" />
    <button class="btn btn-outline-success my-2 my-sm-0" type="" @click="searchBooks">検索</button>
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
    ...mapActions('common', ['setSearchList', 'setSearchText', 'setSearched']),
    searchBooks: async function () {
      if (!this.inputText) return;
      const endpoint = 'https://www.googleapis.com/books/v1';
      const apidata = await axios
        .get(`${endpoint}/volumes?q=${this.inputText}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      const items = apidata.items.map((item) => {
        const row = item.volumeInfo;
        return {
          title: row.title,
          description: row.description,
          link: row.infoLink,
          image: row.imageLinks ? row.imageLinks.smallThumbnail : '',
        };
      });
      this.setSearchList(items);
      this.setSearchText(this.inputText);
      this.setSearched(true);
    },
  },
  computed: {
    ...mapGetters('common', ['searchText']),
  },
};
</script>
