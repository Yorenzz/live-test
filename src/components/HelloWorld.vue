<script setup lang="ts">
import { initModel } from '../live2d.ts'
import SpeedDial from 'primevue/speeddial'
import ProgressSpinner from 'primevue/progressspinner'
import {onMounted, ref} from "vue";

const myModel = ref(null)
const myApp = ref(null)
const loading = ref(true)

const items = ref([
  {
    label: '测试1',
    icon: 'pi pi-pencil',
    command: () => {
      onSelect(1)
    }
  },
  {
    label: '测试2',
    icon: 'pi pi-refresh',
    command: () => {
      onSelect(2)
    }
  },
  {
    label: '测试3',
    icon: 'pi pi-trash',
    command: () => {
      onSelect(3)
    }
  },
  {
    label: '测试4',
    icon: 'pi pi-upload',
    command: () => {
      onSelect(4)
    }
  },
  {
    label: '测试5',
    icon: 'pi pi-external-link',
    command: () => {
      onSelect(5)
    }
  }
])

const onSelect = (type: number) => {
  myModel.value.motion('tap', type)
}

onMounted(async () => {
  loading.value = false
  // const { model, app } = await initModel('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json', 'live2d')
  const { model, app } = await initModel('../../src/assets/aijier_3/aijier_3.model3.json', 'live2d')
  myModel.value = model
  myApp.value = app
})

</script>

<template>
  <div
    class="w-full h-full"
    id="live2d-container"
  >
    <canvas id="live2d"></canvas>
  </div>
  <ProgressSpinner
    v-if="loading"
    class="load"
    :pt="{
      circle: { style: { stroke: '#278DE3 !important' } }
    }"
  />
  <SpeedDial
    :model="items"
    :radius="150"
    type="quarter-circle"
    showIcon="pi pi-bars"
    hideIcon="pi pi-times"
    direction="up-left"
    style="right: 0; bottom: 0; z-index: 999; margin: 0 12px 12px 0"
  >
    <template #item="{ item, onClick }">
      <div
        class="speed-dial-item flex-center-center"
        @click="onClick"
      >
        {{ item.label }}
      </div>
    </template>
  </SpeedDial>
</template>

<style scoped>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.load {
  position: absolute;
  z-index: 1;
}
#live2d-container {
  z-index: 0;
  position: absolute;
}

#live2d-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5); /* 半透明的白色 */
  backdrop-filter: blur(1px); /* 背景模糊效果 */
  z-index: 0;
}

#live2d-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/images/10001.jpeg') no-repeat center center;
  background-size: cover;
  z-index: -1;
}

#live2d {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
}

.speed-dial-item {
  background: white;
  border-radius: 50%;
  padding: 8px;
  height: 2.5rem;
  width: 2.5rem;
  font-size: 12px;
}
</style>
