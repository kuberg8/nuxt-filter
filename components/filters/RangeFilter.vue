<template>
  <div class="range__filter filter">
    <input
      :value="from"
      :placeholder="placeholderFrom"
      maxlength="10"
      @input="handleInput($event, 'from')"
    />
    —
    <input
      :value="to"
      :placeholder="placeholderTo"
      maxlength="10"
      @input="handleInput($event, 'to')"
    />
    ₽
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    placeholderFrom: {
      type: String,
      default: 'Цена от',
    },
    placeholderTo: {
      type: String,
      default: 'до',
    },
  },
  data() {
    return {
      from: '',
      to: '',
    }
  },
  methods: {
    handleInput({ target }: any, name: string): void {
      const numberPrice = target.value.replace(/[^0-9]/g, '')
      const formatted = new Intl.NumberFormat('ru-RU').format(+numberPrice)
      target.value = formatted === '0' ? '' : formatted
      this[name] = target.value
      this.$emit('change', {
        from: +this.from.replace(/[^0-9]/g, ''),
        to: +this.to.replace(/[^0-9]/g, ''),
      })
    },
  },
})
</script>

<style scoped lang="scss">
.range__filter {
  display: flex;
  align-items: center;

  input {
    border: none;
    outline: none;
    margin: 0 10px;
  }
}
</style>
