import { boot } from 'quasar/wrappers';
import Vue from 'vue';
import { Drag, Drop } from 'vue-drag-drop';
import type { App } from 'vue';

export default boot(({ app }: { app: App }) => {
  Vue.component('drag', Drag);
  Vue.component('drop', Drop);
  app.use(pinia);
});
