


<template>
  <!-- <el-select v-model="value" placeholder="Filter By">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
  <section></section>
</template>

<script>
export default {
 data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
      }
    }
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
</style>