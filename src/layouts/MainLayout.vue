<script setup lang="ts">
import { useTaskStore } from '../stores/task';
import { Priority } from 'components/models';
import CreateEditTask from 'src/components/CreateEditTask.vue';
import { ref } from 'vue';

const taskStore = useTaskStore();

const newTask = ref(false);

const openNewTaskModal = () => {
  newTask.value = true;
};

const handleUpdate = () => {
  newTask.value = false;
  taskStore.loadFromLocalStorage();
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="add"
          aria-label="Adicionar Tarefa"
          @click="openNewTaskModal"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <CreateEditTask :open="newTask" @close="newTask = false" @refresh="handleUpdate" />
  </q-layout>
</template>
