<script setup lang="ts">
import { onUpdated, ref } from 'vue';
import { Priority } from './models';
import { useTaskStore } from '../stores/task';
const taskStore = useTaskStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
  },
});

const newTask = ref(false);
const taskName = ref('');
const taskDesc = ref('');
const priorityOptions = ref(['Alta', 'Media', 'Baixa']);
const prioritySelected = ref('');

const statusOptions = ref(['To Do', 'In Progress', 'Done']);
const statusSelected = ref('');

const emit = defineEmits(['close', 'refresh']);

const handleSubmitTask = () => {
  const taskList = JSON.parse(localStorage.getItem('taskList') || '[]') as Array<{
    id: number;
    name: string;
    description: string;
    status: number;
    priority: Priority;
  }>;

  const lastId = taskList.reduce((max, task) => Math.max(max, task.id), 0);

  let priorityStatus: Priority;
  if (prioritySelected.value === 'Alta') {
    priorityStatus = Priority.HIGH;
  } else if (prioritySelected.value === 'Media') {
    priorityStatus = Priority.MEDIUM;
  } else {
    priorityStatus = Priority.LOW;
  }

  let statusId = props.data.status ? props.data.status : 1;
  if (statusSelected != '') {
    if (statusSelected.value == 'To Do') {
      statusId = 1;
    } else if (statusSelected.value == 'In Progress') {
      statusId = 2;
    } else {
      statusId = 3;
    }
  }

  const task = {
    id: props.data.id ? props.data.id : lastId + 1,
    name: taskName.value,
    description: taskDesc.value,
    status: statusId,
    priority: priorityStatus,
  };

  if (props.data) {
    taskStore.updateTask(task);
  } else {
    taskList.push(task);

    taskStore.saveToLocalStorage(taskList);
  }

  emit('refresh');
};

const closeModal = () => {
  emit('close');
};

onUpdated(() => {
  if (props.open) {
    taskName.value = '';
    taskDesc.value = '';
    prioritySelected.value = '';

    if (props.data) {
      taskName.value = props.data.name;
      taskDesc.value = props.data.description;

      if (props.data.priority == 'high') {
        prioritySelected.value = 'Alta';
      } else if (props.data.priority == 'medium') {
        prioritySelected.value = 'Media';
      } else {
        prioritySelected.value = 'Baixa';
      }

      if (props.data.status == 1) {
        statusSelected.value = 'To Do';
      } else if (props.data.status == 2) {
        statusSelected.value = 'In Progress';
      } else {
        statusSelected.value = 'Done';
      }
    }
  }
});
</script>

<template>
  <q-dialog v-model="props.open">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Adicionar Tarefa</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeModal" />
      </q-card-section>

      <q-card-section>
        <q-card style="width: 500px; max-width: 90vw" flat>
          <div class="flex column gap-1">
            <q-input v-model="taskName" label="Nome da Tarefa" :dense="false" />
            <q-input v-model="taskDesc" label="Descrição da Tarefa" :dense="false" />
            <q-select v-model="prioritySelected" :options="priorityOptions" label="Prioridade" />

            <div class="statusFilter" v-if="props.data">
              <q-select v-model="statusSelected" :options="statusOptions" label="Status" />
            </div>

            <div class="flex justify-between">
              <q-btn
                icon="close"
                label="Cancelar"
                aria-label="Cancelar"
                flat
                dense
                color="red"
                @click="closeModal"
              />

              <q-btn
                icon="save"
                label="Salvar"
                aria-label="Salvar"
                flat
                dense
                color="green"
                @click="handleSubmitTask"
              />
            </div>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.statusFilter {
  display: none;
  @media only screen and (max-width: 900px) {
    display: block;
  }
}
</style>
