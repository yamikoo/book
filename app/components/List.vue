<template>
  <section>
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
            <RegistButton :index="index" />
          </td>
          <td><button class="button button--delete">他</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import RegistButton from './RegistButton.vue';

export default {
  components: { RegistButton },
  computed: {
    ...mapGetters('common', ['searchList']),
  },
};
</script>
