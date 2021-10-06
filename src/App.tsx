import { defineComponent } from "vue";
import mock from "mockjs";
import VList from "./components/VList";
import { Item } from "./type";
import "./app.scss";

export default defineComponent({
  name: "App",
  components: {
    VList,
  },
  setup() {
    const list = new Array(1000).fill(0).map((_, index) => {
      return { id: index, text: mock.Random.sentence(10, 100) };
    });

    return () => (
      <>
        <div class="main">
          <VList
            {...{
              list: list,
              height: 45,
              show_num: 10,
              uneven: true,
              fill_num: 5,
              throttle_time:67
            }}
          >
            {{
              default(item: Item) {
                return (
                  <div class="item">
                    {item.id}----{item.text}
                  </div>
                );
              },
            }}
          </VList>
        </div>
      </>
    );
  },
});
