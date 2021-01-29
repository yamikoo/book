<template>
  <section class="container">
    <NuxtLink to="/search">search</NuxtLink>
    <NuxtLink to="/books">books</NuxtLink>
    <div class="addArea">
      <input type="text" maxlength="100" v-model="inputText" />
      <button id="addButton" class="button button--green" @click="searchBooks">検索</button>
    </div>
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
        <tr v-for="(item, index) in searchList">
          <td><img :src="item.image" /></td>
          <td style="word-break: break-all">{{ item.title }}</td>
          <td style="word-break: break-all">{{ item.description }}</td>
          <td style="word-break: break-all">
            <a :href="item.link">{{ item.link }}</a>
          </td>
          <td>
            <button class="button button--yet" @click="addBook(index)">登録</button>
          </td>
          <td><button class="button button--delete">他</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  props: {},
  data: function () {
    return {
      inputText: '',
    };
  },
  created: async function () {},
  mounted: async function () {
    this.inputText = this.searchText;
  },
  watch: {},
  methods: {
    ...mapActions('common', ['setSearchList', 'setSearchText']),
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
    },
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
      console.log(result);
    },
  },
  computed: {
    ...mapGetters('common', ['searchList', 'searchText']),
  },
};
</script>

<style></style>
