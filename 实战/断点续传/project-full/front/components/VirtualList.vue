<template>
  <div ref="list" class="kkb-list-container" @scroll="scrollEvent($event)">
    <div class="kkb-list-phantom" :style="{height: listHeight+'px'}">
    </div>
    <!-- <div class="kkb-list" :style="{top: getTop}"> -->
    <div class="kkb-list" :style="{ transform: getTransform }">
      <div
        class="kkb-list-item"
        v-for="item in visibleData"
        :key="item"
        :article="item"
        :style="{height: size+'px'}"
      >
        <h2 style="width:900px">
    

        {{item}}
    

      </h2>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem'
export default {
  name:'VirtualList',
  components:{ArticleItem},
  props: {
    //所有列表数据
    listData:{
      type:Array,
      default:()=>[]
    },
    //每项高度
    size: {
      type: Number,
      default:200
    }
  },
  computed:{
    listHeight() {
      return this.listData.length * this.size
    },
    //偏移量对应的style
    getTransform(){
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    getTop() {
      return `${this.startOffset}px`
    },
    // 当前显示几条数据
    visibleCount() {
      return Math.ceil(this.screenHeight/this.size)
    },
    // 当前显示的数据
    visibleData() {
      return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
    }
  },
  mounted() {
    this.end = this.start + this.visibleCount
  },
  data() {
    return {
      //可视区域高度
      screenHeight:800,
      //偏移量
      startOffset:0,
      //起始索引
      start:0,
      //结束索引
      end:4,
    };
  },
  methods: {
    scrollEvent() {
      let scrollTop = this.$refs.list.scrollTop
      this.start = Math.floor(scrollTop/this.size)
      this.end = this.start + this.visibleCount

      this.startOffset = scrollTop - (scrollTop%this.size)
    }
  }
};
</script>


<style scoped>
.kkb-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
}
.kkb-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.kkb-list {
  /* position: absolute;
  left: 0;
  top: 0;
  right: 0; */
}
.kkb-list-item {
  padding: 10px;
  color: #555;
  border-bottom: 1px solid #999;
}
</style>