<script lang="ts">
import { defineComponent } from 'vue'
import VVList from '../../src/VVList'
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
  <div style="height: 600px;">
    <VVList :list="list" :show_num="10" :uneven="true" :fill_num="5">
      <template v-slot="item">
        <div :key="item.id">{{ item.text }}</div>
      </template>
    </VVList>
  </div>
</template>