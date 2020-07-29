import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
// Import Vuetify methods to use with the application
import Vuetify, {
  VCard,
  VFlex,
  VRow,
  VSelect,
  VCardTitle,
  VCardActions,
  VCardText,
  VProgressCircular,
  VDivider,
  VApp
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VCard,
    VFlex,
    VRow,
    VSelect,
    VCardTitle,
    VCardActions,
    VCardText,
    VProgressCircular,
    VDivider,
    VApp
  }
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})
