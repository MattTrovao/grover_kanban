<script setup lang="ts">
import { useTaskStore } from '../stores/task';
import KanbanColumn from 'components/KanbanColumn.vue';
import Loading from 'components/Loading.vue';
import { ref, onMounted, watch } from 'vue';

const taskStore = useTaskStore();
const loading = ref(false);

const cardsToDo = ref(taskStore.cardsToDo);
const cardsProgress = ref(taskStore.cardsProgress);
const cardsDone = ref(taskStore.cardsDone);

const handleDrop = () => {};

const testDD = (task) => {
  console.log('t', task);
};

onMounted(() => {
  loading.value = true;

  setTimeout(() => {
    taskStore.loadFromLocalStorage();
    loading.value = false;
  }, 1200);
});

watch(
  () => taskStore.taskList,
  () => {
    cardsToDo.value = taskStore.cardsToDo;
    cardsProgress.value = taskStore.cardsProgress;
    cardsDone.value = taskStore.cardsDone;
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <q-page class="py-2">
    <Loading v-if="loading" />
    <div class="kanban" v-else>
      <KanbanColumn
        title="To Do"
        :cardList="cardsToDo"
        @dragover="handleDrop(1, card)"
        @drop="testDD(task)"
      />
      <KanbanColumn
        title="In Progress"
        :cardList="cardsProgress"
        @dragover="handleDrop(2, card)"
        @drop="testDD(task)"
      />
      <KanbanColumn
        title="Done"
        :cardList="cardsDone"
        @dragover="handleDrop(3, card)"
        @drop="testDD(task)"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.kanban {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 2rem;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
