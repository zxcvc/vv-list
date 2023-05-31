## 一个 vue3 的虚拟滚动列表

### 支持不定高度

### usage：

```bash
pnpm add vv-list
```

```vue
<script lang="ts">
import { defineComponent } from 'vue'
import VVList from 'vv-list'
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
    <VVList :list="list" :show_num="10" :uneven="true" :throttle_time="67">
      <template v-slot="item">
        <div :key="item.id">{{ item.text }}</div>
      </template>
    </VVList>
  </div>
</template>
```

#### 参数说明：

| 参数名称      | 描述                                                         | 类型       |
| ------------- | ------------------------------------------------------------ | ---------- |
| list          | 要渲染的列表数据                                             | Array<any> |
| show_num      | 想要渲染在页面上的数量                                       | number     |
| item_height   | 滚动项的高度，当滚动项为固定高度时传入可以提高性能           | number     |
| throttle_time | 当滚动容器大小改变是会重新计算滚动项的位置信息，为了减少性能损耗采用了节流，此参数即传给节流函数的时间，单位为ms(毫秒) | number     |
| uneven        | 滚动项高度是否为不确定，当为true时表示滚动项高度不确定       | boolean    |

### 注意事项：

- VVList会继承父元素的宽高，所以建议在VVList的父元素上设置宽高，而不是直接给VVList设置。

- 滚动容器大小改变时会重新计算滚动项的位置信息，当列表很大时即使有节流函数依旧会有一定的性能损耗，所以不建议频繁改变滚动容器的大小。