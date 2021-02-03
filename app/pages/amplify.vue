<template>
  <div>
    <h1>amplify api</h1>
    <form class="form-inline my-2 my-lg-0" @submit.prevent>
      <input class="form-control mr-sm-2" type="text" maxlength="50" label="Name" v-model="name" />
      <input class="form-control mr-sm-2" type="text" maxlength="50" label="Description" v-model="description" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="" @click="createTodo">Create</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.name }} : {{ todo.description }}</li>
    </ul>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createTodo } from '~/graphql/mutations';
import { listTodos } from '~/graphql/queries';

export default {
  data() {
    return {
      name: '',
      description: '',
      todos: [],
    };
  },
  async created() {
    await this.getTodos();
  },
  methods: {
    async createTodo() {
      const { name, description } = this;
      if (!name || !description) return false;
      const todo = { name, description };
      await API.graphql({
        query: createTodo,
        variables: { input: todo },
      });
      this.name = '';
      this.description = '';
      this.getTodos();
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos,
      });
      this.todos = todos.data.listTodos.items;
    },
  },
};
</script>
