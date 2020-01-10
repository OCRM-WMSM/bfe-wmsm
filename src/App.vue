<template>
  <div id="wrapper">
    <bocnet-header>
    </bocnet-header>

    <bocnet-content>
    </bocnet-content>

    <!--
    <bocnet-footer>
    </bocnet-footer>
  -->
  </div>
</template>

<script>
import BocnetHeader from '@/common/BocnetHeader'
import BocnetFooter from '@/common/BocnetFooter'
import BocnetContent from '@/common/BocnetContent'
export default {
  components: {
    'BocnetHeader': BocnetHeader,
    'BocnetFooter': BocnetFooter,
    'BocnetContent': BocnetContent
  },
  beforeCreate() {
    this.$store.dispatch('saveLocale', this.$i18n.locale);
  }
}
</script>

<style>

</style>
