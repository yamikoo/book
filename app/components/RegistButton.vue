<template>
  <button class="button button--yet" @click="addBook(index)">登録</button>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  props: {
    index: Number,
  },
  methods: {
    ...mapActions('common', ['setBookRegisted']),
    addBook: async function (index) {
      if (this.searchList.indexOf(index) == false) return;
      const endpoint = 'http://localhost:3333/api/books';
      const result = await axios
        .post(`${endpoint}`, this.searchList[index])
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
      this.setBookRegisted(true);
    },
  },
  computed: {
    ...mapGetters('common', ['searchList']),
  },
};
</script>
