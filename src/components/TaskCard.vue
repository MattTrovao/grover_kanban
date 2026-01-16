<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '../stores/task';
import CreateEditTask from './CreateEditTask.vue';
import { Priority } from './models';
import type { Card } from './models';

const taskStore = useTaskStore();

const props = defineProps<Card>();

const openModal = ref(false);

const emit = defineEmits(['dragCard']);

const priorityMap = {
  [Priority.HIGH]: { text: 'Alta', color: 'red' },
  [Priority.MEDIUM]: { text: 'Média', color: 'yellow' },
  [Priority.LOW]: { text: 'Baixa', color: 'green' },
} as const;

const priorityText = (value: Priority) => {
  return priorityMap[value].text;
};

const priorityColor = (value: Priority) => {
  return priorityMap[value].color;
};

const handleDeleteTask = (id: number) => {
  taskStore.removeTask(id);
};

const handleCheckEditTask = () => {
  openModal.value = true;
};

const dragCard = (card) => {
  emit('dragCard', card);
};
</script>

<template>
  <div class="tc" @click="handleCheckEditTask()" @drag="dragCard(props)" draggable="true">
    <p>
      <small>{{ props.id }}.</small>
      {{ props.name }}
    </p>

    <div class="__data">
      <q-badge :color="priorityColor(props.priority)">
        {{ priorityText(props.priority) }}
      </q-badge>
      <q-btn
        flat
        size="sm"
        icon="close"
        aria-label="Deletar Tarefa"
        @click="handleDeleteTask(props.id)"
        color="red"
        class="p-0"
      />
    </div>
  </div>

  <CreateEditTask
    :open="openModal"
    :data="props"
    @close="openModal = false"
    @refresh="openModal = false"
  />
</template>

<style lang="css" scoped>
.tc {
  border: 1px solid var(--primary-400);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  cursor: move;

  p {
    margin: 0;
    font-size: 1rem;
  }

  .__data {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
