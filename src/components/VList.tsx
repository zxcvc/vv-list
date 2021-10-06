import {
  defineComponent,
  computed,
  ref,
  onMounted,
  nextTick,
  withModifiers,
} from "vue";
import {throttle} from "lodash"
import "./VList.scss";
import {Position} from "../type"


export default defineComponent({
  props: {
    show_num: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    fill_num: {
      type: Number,
      default: 0,
    },
    uneven: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const container = ref(null);
    const wrapper = ref(null);

    const start = ref(0);
    const end = computed(() => start.value + props.show_num);

    
    const pre = computed(() => Math.min(start.value, props.fill_num));
    const next = computed(() =>
      Math.min(props.list.length - end.value, props.fill_num)
    );
    const current = computed(() =>
      props.list.slice(start.value - pre.value, end.value + next.value)
    );

    const offset = ref(0);
    const sum_height = ref(props.list.length * props.height);

    let positions: Array<Position> = [];

    function get_start(scroll_top: number): number {
      let res = 0;
      let left = 0;
      let right = positions.length - 1;

      while (left <= right) {
        const mid = (left + right) >> 1;
        if (positions[mid].top === scroll_top) {
          return mid;
        } else if (positions[mid].top > scroll_top) {
          right = mid - 1;
        } else {
          left = mid + 1;
          res = mid;
        }
      }
      return res;
    }
    function set_position() {
      const children = (wrapper.value as unknown as HTMLElement).children;
      const length = children.length;
      for (let i = 0; i < length; ++i) {
        const { height } = children[i].getBoundingClientRect();
        const current_index = Math.min(
          start.value + i - pre.value,
          props.list.length - 1
        );
        const pre_el = positions[current_index - 1];
        positions[current_index].top = pre_el ? pre_el.bottom : 0;
        positions[current_index].bottom = positions[current_index].top + height;
        positions[current_index].height = height;
      }
      
      for (let i = end.value + next.value; i < props.list.length; ++i) {
        positions[i].top = positions[i - 1].bottom;
        positions[i].bottom = positions[i].top + positions[i].height;
      }

    }
    function resize_handler(){
      nextTick(()=>{
        set_position();
        sum_height.value = positions[positions.length - 1].bottom;
      })
    }
    function scroll_handler(e: Event) {
      const target = e.target as HTMLElement;
      const scroll_top = target.scrollTop;
      if (props.uneven) {
        const _start = get_start(scroll_top);
        start.value = Math.min(props.list.length - props.show_num, _start);
        offset.value = positions[start.value - pre.value]
          ? positions[start.value - pre.value].top
          : 0;
        nextTick(() => {
          set_position();
          sum_height.value = positions[positions.length - 1].bottom;
        });
      } else {
        start.value = Math.floor(scroll_top / props.height);
        offset.value = (start.value - pre.value) * props.height;
      }
    }

    if (props.uneven) {
      onMounted(() => {
        positions = props.list.map((_, index) => {
          const top = props.height * index;
          const height = props.height;
          const bottom = top + height;
          return { top, bottom, height };
        });
        set_position();
        window.addEventListener('resize',throttle(resize_handler,200,{leading:true,trailing:true}))
      });
    }

    return () => (
      <div
        class="container"
        ref={container}
        onScroll={withModifiers(throttle(scroll_handler,66,{leading:true,trailing:true}), ["passive", "once"])}
        
      >
        <div
          class="wrapper"
          style={{ transform: `translateY(${offset.value}px)` }}
          ref={wrapper}
        >
          {slots.default
            ? current.value.map((item) => slots.default && slots.default(item))
            : ""}
        </div>
        <div style={{ height: sum_height.value + "px" }}></div>
      </div>
    );
  },
});
