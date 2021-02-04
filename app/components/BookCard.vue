<template>
  <div class="col-md-6">
    <div class="card flex-md-row mb-4 shadow-sm h-md-250">
      <div class="card-body d-flex flex-column align-items-start">
        <strong class="d-inline-block mb-2 text-success">[技術書]</strong>
        <h3 class="mb-0">
          <a class="text-dark" :href="item.link">{{ item.title }}</a>
        </h3>
        <div class="mb-1 text-muted">2021/02</div>
        <p class="card-text mb-auto">{{ item.description }}</p>
        <div v-if="kind == 'book'">
          <button class="btn btn-success" @click="selectBook()">詳細</button>
          <button class="btn btn-danger" @click="deleteBook(item.book_id)">削除(詳細引越予定)</button>
        </div>
        <div v-else-if="kind == 'search'">
          <regist-button :index="index"></regist-button>
        </div>
      </div>
      <img class="card-img-right flex-auto d-none d-lg-block" :src="item.image" style="width: 200px; height: 250px" />
    </div>
  </div>
</template>

<style scoped>
.btn {
  display: inline-block;
}
.btn-danger {
  margin-left: 30px;
}

.text-dark {
  font-size: 20px;
}
.card-text {
  font-size: 14px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import RegistButton from './RegistButton.vue';

export default {
  components: { RegistButton },
  props: {
    item: Object,
    index: Number,
    kind: String,
  },
  methods: {
    selectBook: function () {
      this.setSelectBook(this.item);
      this.setViewDetail(true);
    },
    deleteBook: async function (bookID) {
      const endpoint = 'http://localhost:3333/api/books';
      const result = await axios
        .delete(`${endpoint}`, { data: { book_id: bookID } })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      this.setBookList(
        this.bookList.filter((item) => {
          return item.book_id != bookID;
        })
      );
    },
    ...mapActions('common', ['setBookList', 'setSelectBook', 'setViewDetail']),
  },
  computed: {
    ...mapGetters('common', ['bookList', 'viewDetail']),
  },
};
</script>
