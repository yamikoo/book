<template>
  <div class="col-md-6">
    <div class="card flex-md-row mb-4 shadow-sm h-md-250">
      <div class="card-body d-flex flex-column align-items-start">
        <strong class="d-inline-block mb-2 text-success">[{{ item.artistName }}]</strong>
        <h3 class="mb-0">
          <a class="text-dark" :href="item.trackViewUrl">{{ item.trackName }}</a>
        </h3>
        <div class="mb-1 text-muted">{{ item.releaseDate.substr(0, 10) }}</div>
        <p class="card-text mb-auto">{{ item.trackPrice }}円</p>
        <div>
          <audio :src="item.previewUrl" controls></audio>
        </div>
        <div v-if="'id' in item">
          <button class="button button--yet" @click="del(item.id)">削除</button>
        </div>
        <div v-else>
          <button class="button button--yet" @click="add(index)">登録</button>
        </div>
      </div>
      <img class="card-img-right flex-auto d-none d-lg-block" :src="item.artworkUrl100" style="width: 200px; height: 200px" />
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
import { API } from 'aws-amplify';
import { createTodo, deleteTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';

export default {
  props: {
    item: Object,
    index: Number,
    kind: String,
  },
  methods: {
    ...mapActions('common', ['setBookList', 'setSelectBook', 'setViewDetail']),
    add: async function (index) {
      if (this.bookList.indexOf(index) == false) return;
      const name = this.bookList[index].artistName + '__' + this.bookList[index].trackName;
      const description = JSON.stringify({
        artistName: this.bookList[index].artistName,
        trackViewUrl: this.bookList[index].trackViewUrl,
        trackName: this.bookList[index].trackName,
        releaseDate: this.bookList[index].releaseDate,
        trackPrice: this.bookList[index].trackPrice,
        previewUrl: this.bookList[index].previewUrl,
        artworkUrl100: this.bookList[index].artworkUrl100,
      });
      const todo = { name, description };
      await API.graphql({
        query: createTodo,
        variables: { input: todo },
      });
      location.reload();
    },
    del: async function (id) {
      const todo = { id };
      await API.graphql({
        query: deleteTodo,
        variables: { input: todo },
      });
      location.reload();
    },
  },
  computed: {
    ...mapGetters('common', ['bookList', 'viewDetail']),
  },
};
</script>
