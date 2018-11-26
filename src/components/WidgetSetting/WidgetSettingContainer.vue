<template>
  <div id="WidgetSettingContainer">
    <b-tabs v-model="tabIndex" style="padding-bottom: 46px; overflow: overlay; max-height: 100%;">
      <b-tab id="SelectedCities" title="Selected cities" active>
        <SelectedCities></SelectedCities>
      </b-tab>
      <b-tab title="Add new city" id="AddNewCity">
        <AddNewCity></AddNewCity>
      </b-tab>
    </b-tabs>
    <div class="text-left next-prev-btn-group" id="next-prev-btn-group">
      <b-button-group class="mt-2">
        <b-btn @click="apply" variant="primary">Apply</b-btn>
        <b-btn @click="tabIndex--">🖘</b-btn>
        <b-btn @click="tabIndex++">🖙</b-btn>
      </b-button-group>
    </div>
  </div>
</template>

<style>

  #WidgetSettingContainer {
    position: relative;
    height: calc(100vh - 144px);
  }

  .next-prev-btn-group#next-prev-btn-group {
    position: absolute;
    top: calc(100% - 46px);
  }
</style>

<script>
import AddNewCity from './AddNewCity.vue'
import SelectedCities from './SelectedCities.vue'

export default {
  name: 'WidgetSettingContainer',
  components: {
    AddNewCity,
    SelectedCities,
  },
  data: function() {
    return {
      tabIndex: 0
    };
  },
  methods: {
    apply: function() {
      this.$router.push('/')
    }
  },
  mounted: function() {

    if (this.$route.params !== undefined && 
      this.$route.params.numTab !== undefined) {

      this.tabIndex = parseInt(this.$route.params.numTab);
    }
  }
}
</script>