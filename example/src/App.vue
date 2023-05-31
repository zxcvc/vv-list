<script lang="ts">
import { defineComponent } from 'vue'
import VVList from '../../dist/index.esm.js'
import mock from 'mockjs'

export default defineComponent({
  components: { VVList },
  setup() {
    const list = new Array(1000).fill(0).map((_item, _index) => {
      return { id: mock.Random.id(), text: mock.Random.sentence(10, 100) };
    });
    return {
      list
    }
  }
})

</script>
<template>
  <div style="height: 500px;">
    <VVList :list="list" :item_height="45" :show_num="10" :uneven="true" :fill_num="5" :throttle_time="67">
      <template v-slot="item">
        <div :key="item.id" style="border: 2px solid rgb(245, 239, 239);">{{ item.text }}</div>
      </template>
    </VVList>
  </div>
</template>