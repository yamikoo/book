<template>
  <div class="row mb-2">
    <template v-for="(item, index) in bookList">
      <book-card :item="item" :index="index" :kind="'book'"></book-card>
    </template>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import BookCard from './BookCard.vue';

export default {
  components: { BookCard },
  mounted: async function () {
    const res = await this.getBooks();
    this.setBookList(res);
  },
  methods: {
    ...mapActions('common', ['setBookList']),
    getBooks: async function () {
      const endpoint = 'http://localhost:3333/api/books';
      const apidata = await axios
        .get(`${endpoint}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      return apidata.Items.map((item) => {
        const row = item.detail;
        return {
          book_id: item.cname,
          title: row.title,
          description: row.description,
          link: row.link,
          image: row.image ? row.image : '',
        };
      });
    },
  },
  computed: {
    ...mapGetters('common', ['bookList']),
  },
};
</script>
