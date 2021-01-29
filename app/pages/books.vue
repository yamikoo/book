<template>
  <section class="container">
    <NuxtLink to="/search">search</NuxtLink>
    <NuxtLink to="/books">books</NuxtLink>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th style="width: 15%">画像</th>
          <th style="width: 15%">表題</th>
          <th style="width: 35%">説明</th>
          <th style="width: 15%">遷移</th>
          <th style="width: 10%"></th>
          <th style="width: 10%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td><img :src="item.image" /></td>
          <td style="word-break: break-all">{{ item.title }}</td>
          <td style="word-break: break-all">{{ item.description }}</td>
          <td style="word-break: break-all">
            <a :href="item.link">{{ item.link }}</a>
          </td>
          <td><button class="button button--yet">感想</button></td>
          <td><button class="button button--delete" @click="deleteBook(item.book_id)">削除</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  props: {},
  data: function () {
    return {
      apidata: null,
      items: [],
      form: {
        title: '',
      },
    };
  },
  created: async function () {
    await this.getBooks();
  },
  watch: {},
  methods: {
    getBooks: async function () {
      const endpoint = 'http://localhost:3333/api/books';
      this.apidata = await axios
        .get(`${endpoint}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      this.items = this.apidata.Items.map((item) => {
        //const row = JSON.parse(item.detail);
        const row = item.detail;
        return {
          book_id: item.cname,
          title: row.title,
          description: row.description,
          link: row.link,
          image: row.image ? row.image : '',
        };
      });
      console.log(this.items);
    },
    deleteBook: async function (bookID) {
      const endpoint = 'http://localhost:3333/api/books';
      this.apidata = await axios
        .delete(`${endpoint}`, { data: { book_id: bookID } })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      this.items = this.items.filter((item) => {
        return item.book_id != bookID;
      });
      console.log(this.apidata);
    },
  },
  //  computed: {},
};
</script>

<style></style>
