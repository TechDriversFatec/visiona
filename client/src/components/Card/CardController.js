  export default {
    data () {
      return {
        dialog: false,
        show: true,
      }
    },
    props: {
      area: {
        type: Object,
        default: function() {
          return {};
        }
      }
    }
  }
