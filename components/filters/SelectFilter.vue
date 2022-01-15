<template>
  <div @focusout="blurHandler" tabindex="-1" ref="select" class="select">
    <div class="select__filter filter" @click="active = !active">
      <span :class="['selected__text', { active__filter: isSelected }]"
        >{{ selectedText }}
        <svg
          v-if="isSelected"
          @click.stop="selected = null, $emit('select', null)"
          class="selected__text-clear"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2005 3.80668C11.9405 3.54668 11.5205 3.54668 11.2605 3.80668L8.00047 7.06001L4.74047 3.80001C4.48047 3.54001 4.06047 3.54001 3.80047 3.80001C3.54047 4.06001 3.54047 4.48001 3.80047 4.74001L7.06047 8.00001L3.80047 11.26C3.54047 11.52 3.54047 11.94 3.80047 12.2C4.06047 12.46 4.48047 12.46 4.74047 12.2L8.00047 8.94001L11.2605 12.2C11.5205 12.46 11.9405 12.46 12.2005 12.2C12.4605 11.94 12.4605 11.52 12.2005 11.26L8.94047 8.00001L12.2005 4.74001C12.4538 4.48668 12.4538 4.06001 12.2005 3.80668Z"
            fill="gray"
          />
        </svg>
      </span>
      <img
        :class="{ active }"
        src="https://img.icons8.com/ios/50/000000/expand-arrow--v1.png"
        style="margin-left: 10px"
      />
    </div>

    <transition name="fade">
      <div v-if="active" class="select__list">
        <div
          v-for="(item, i) in options"
          :key="i"
          :class="['select__list-item', { active__filter: item === selected }]"
          @click="setFilter(item)"
        >
          {{ itemText ? item[itemText] : item }}
        </div>
        <span v-if="!options.length">Нет вариантов</span>
      </div>
    </transition>
    <div></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selected: null,
      active: false,
    }
  },
  methods: {
    blurHandler(event: any): void {
      const enteringParent: Boolean = this.$refs.select.contains(
        event.relatedTarget
      )

      if (!enteringParent) {
        this.active = false
      }
    },
    setFilter(item: any): void {
      this.selected = item
      this.$emit('select', item)
      this.active = false
    },
  },
  computed: {
    selectedText() {
      if (!this.selected) {
        return this.placeholder
      } else if (this.itemText) {
        return this.selected[this.itemText]
      } else return this.selected
    },
    isSelected() {
      return this.selectedText && this.selectedText !== this.placeholder
    },
  },
})
</script>

<style scoped lang="scss">
.select {
  position: relative;
}

.select__filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  min-width: 229px;
  user-select: none;

  img {
    max-width: 15px;
    max-height: 15px;

    &.active {
      transform: rotate(180deg);
    }
  }

  .selected__text {
    display: flex;
    align-items: center;
    margin: 0 2px;
    padding: 0 7px;
    transition: 0.1s;
    border-radius: 4px;
    color: gray;

    .selected__text-clear {
      cursor: pointer;
      margin-left: 5px;
      transition: 0.2s;

      path {
        transition: .2s;
      }

      &:hover {
        transform: scale(1.1);

        path {
          fill: black;
        }
      }
    }
  }
}

.select__list {
  display: flex;
  flex-direction: column;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
  border: none;
  padding: 8px;
  z-index: 100;
  background: white;
  width: 100%;

  .select__list-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    transition: 0.2s;
    border-radius: 4px;
    padding: 3px 8px;

    &:hover {
      background: #e6e6e6;
    }
  }
}

.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
