<template>
  <div id="chartView">
    <v-progress-circular
      v-if="showProgress"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
/**
 * Fetch reportType and generate data for chartplotting
 * Draws the google line chart along with the report type parameters
 * https://developers.google.com/chart/interactive/docs/gallery/linechart
*/
import store from '@/store'
import eventBus from '@/utility/event'

export default {
  name: 'ChartViewer',
  props: {
    reportType: String
  },
  data () {
    return {
      showProgress: false,
      chartData: {
        points: [],
        title: null
      }
    }
  },
  methods: {
    /**
    * method: displayChart
    * Read store and reportType to generate data and plot chart
    */
    displayChart () {
      /* eslint-disable no-undef */
      const self = this
      self.chartData.points = []
      const fetchData = store.getters['reportStore/reportData']
      fetchData.reportData.records.map(function (val) {
        self.chartData.points.push([val.date, val[self.reportType]])
        self.chartData.points.sort()
      })
      self.showProgress = true
      google.charts.load('current', { packages: ['corechart', 'line'] })
      google.charts.setOnLoadCallback(drawChart)
      /**
      * method: drawChart
      * Render google chart based on the chartData
      */
      function drawChart () {
        // Define the chart to be drawn.
        const data = new google.visualization.DataTable()
        data.addColumn('string', 'Element')
        data.addColumn('number', self.reportType)
        data.addRows(self.chartData.points)
        const options = {
          hAxis: {
            title: fetchData.reportData.xaxis
          },
          vAxis: {
            title: self.reportType
          },
          width: 800,
          height: 400
        }

        // Instantiate and draw the chart
        var chart = new google.visualization.LineChart(document.getElementById('chartView'))
        chart.draw(data, options)
        self.showProgress = false
      }
    }
  },
  created () {
    // Listen for the triggerChart event and its payload
    eventBus.$on('triggerChart', () => {
      this.displayChart()
    })
  }
}

</script>
