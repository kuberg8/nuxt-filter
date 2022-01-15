<template>
  <div class="type__filter filter">
    <div
      v-for="(item, i) in types"
      :key="i"
      :class="['type__filter-item', { active__filter: selected[i] }]"
      @click="setFilter(i)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    types: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: new Array(this.types.length).fill(false),
    }
  },
  methods: {
    setFilter(i: number): void {
      const isSelected: Boolean = this.selected[i]
      this.$set(this.selected, i, !isSelected)

      const selectedItems: Array<any> = this.types.filter(
        (type, i) => this.selected[i]
      )
      this.$emit('select', selectedItems)
    },
  },
})
</script>

<style scoped lang="scss">
.type__filter {
  display: flex;

  &-item {
    margin: 0 2px;
    padding: 0 7px;
    cursor: pointer;
    transition: 0.1s;
    border-radius: 4px;

    &:not(.active__filter):hover {
      background: #e6e6e6;
    }
    &:active {
      box-shadow: inset 0 3px 5px rgb(0 0 0 / 13%);
    }
  }
}
</style>
