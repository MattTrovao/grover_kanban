<script lang="ts" setup>
import type { Card } from './models';
import TaskCard from './TaskCard.vue';

const props = defineProps<{
  title: string;
  cardList: Card[];
}>();
</script>

<template>
  <div class="kc">
    <div class="__title">
      <h2>
        {{ props.title }}
      </h2>
    </div>

    <div class="__list">
      <template v-for="card in props.cardList" :key="card.id">
        <TaskCard
          :id="card.id"
          :name="card.name"
          :priority="card.priority"
          :description="card.description"
          :status="card.status"
        />
      </template>
    </div>
  </div>
</template>

<style lang="css" scoped>
.kc {
  width: 100%;
  height: 80dvh;
  border: 1px solid var(--primary-700);
  border-radius: 8px;
  overflow: hidden;

  .__title {
    text-align: center;
    padding: 10px 0;
    background: var(--primary-700);
    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--secondary);
      margin: 0;
    }
  }

  .__list {
    height: calc(100% - 56px);
    overflow: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #e9e9e9;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--secondary-600);
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--secondary-700);
    }
  }

  @media only screen and (max-width: 900px) {
    height: 30dvh;
  }
}
</style>
