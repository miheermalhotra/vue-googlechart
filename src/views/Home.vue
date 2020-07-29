<template>
  <v-flex class="home">
    <ReportViewer />
  </v-flex>
</template>

<script>
/**
 * Home: Load application
 * Main page to remder the application
 * @components: ReportViewer
 */
import ReportViewer from '@/components/ReportViewer'
import store from '@/store'
import reportJson from '@/../mocks/dataReport.json'

export default {
  name: 'Home',
  data () {
    return {
      reportJson
    }
  },
  components: {
    ReportViewer
  },
  created () {
    // SET store information from json file
    store.dispatch('reportStore/setChartData', { reportData: this.reportJson })
  }
}
</script>
