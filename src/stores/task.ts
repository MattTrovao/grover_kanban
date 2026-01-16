import { defineStore } from 'pinia';
import type { Card } from 'components/models';

export const useTaskStore = defineStore('task', {
  state: () => ({
    taskList: [] as Card[],
  }),

  getters: {
    cardsToDo: (state) => state.taskList.filter((t) => t.status === 1),
    cardsProgress: (state) => state.taskList.filter((t) => t.status === 2),
    cardsDone: (state) => state.taskList.filter((t) => t.status === 3),
  },

  actions: {
    loadFromLocalStorage() {
      const data = localStorage.getItem('taskList');
      if (data) {
        this.taskList = JSON.parse(data);
      }
    },

    saveToLocalStorage(task) {
      this.taskList = task;

      localStorage.setItem('taskList', JSON.stringify(this.taskList));
    },

    addTask(task: Omit<Card, 'id'> & { status: number }) {
      const lastId = this.taskList.reduce((max, t) => Math.max(max, t.id), 0);
      const newTask: Card & { status: number } = {
        ...task,
        id: lastId + 1,
      };

      this.taskList.push(newTask);
      this.saveToLocalStorage(this.taskList);
    },

    updateTask(task: Card & { status: number }) {
      const index = this.taskList.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.taskList[index] = task;
        this.saveToLocalStorage(this.taskList);
      }
    },

    removeTask(taskId: number) {
      this.taskList = this.taskList.filter((t) => t.id !== taskId);
      this.saveToLocalStorage(this.taskList);
    },

    clearAll() {
      this.taskList = [];
      localStorage.removeItem('taskList');
    },
  },
});
