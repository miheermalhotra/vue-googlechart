<template>
  <div class="xs12 pa-4">
    <v-card class="mx-auto" min-height="500px">
      <v-card-text>
        <h1 class="pa-4 text-xs-center">{{ title }}</h1>
        <v-divider class="mb-4"></v-divider>
        <v-flex class="xs12 sm4 mb-4">
          <v-select
            v-model="selectedReport"
            :items="dataItems"
            item-text="name"
            item-value="value"
            @change="getReportList"
            label="Select Report type"
            dense
            filled
            required
          ></v-select>
        </v-flex>
      </v-card-text>
      <v-card-text v-if="selectedReport.length">
        <ChartViewer :reportType="selectedReport"/>
      </v-card-text>
      <v-card-text v-if="!selectedReport.length">
        <div>{{ helpText }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/**
 * Render data to fetch filtered dataItems
 * Send filtered item to chartviewer component
 * @components: ChartViewer
*/
import ChartViewer from '@/components/ChartViewer'
import store from '@/store'
import eventBus from '@/utility/event'

export default {
  name: 'ReportViewer',
  components: {
    ChartViewer
  },
  data () {
    return {
      title: 'Reports',
      helpText: 'No value selected',
      dataItems: [],
      selectedReport: [],
      chartData: {
        points: [],
        title: null
      }
    }
  },
  methods: {
    /**
    * method: getReportTypes
    * Read state from store get types and filter xaxis defined
    */
    getReportTypes () {
      const reportData = store.getters['reportStore/reportData']
      this.dataItems = Object.keys(reportData.reportData.records.reduce(function retrieveKeys (result, obj) {
        return Object.assign(result, obj)
      }))
      this.dataItems = this.dataItems.filter(e => e !== reportData.reportData.xaxis)
    },
    /**
    * method: getReportList
    * Trigger event to generate chartview
    */
    getReportList () {
      eventBus.$emit('triggerChart', true)
    }
  },
  created () {
    this.getReportTypes()
  }
}
</script>
