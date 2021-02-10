<template>
  <div class="row mb-2">
    <template v-for="(item, index) in bookList">
      <book-card :item="item" :index="index" :kind="'book'"></book-card>
    </template>
    <template v-for="(item, index) in musics">
      <audio-card :item="item" :index="index" :kind="'audio'"></audio-card>
    </template>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import BookCard from './BookCard.vue';
import { API } from 'aws-amplify';
import { createTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import AudioCard from './AudioCard.vue';

export default {
  components: { BookCard, AudioCard },
  data() {
    return {
      musics: [],
    };
  },
  mounted: async function () {
    this.getTodos();
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
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos,
      });
      this.musics = todos.data.listTodos.items.map(function (item) {
        let data = JSON.parse(item.description);
        data['id'] = item.id;
        return data;
      });
    },
  },
  computed: {
    ...mapGetters('common', ['bookList']),
  },
};
</script>
