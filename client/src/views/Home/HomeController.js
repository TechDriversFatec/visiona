export default {
    name: 'Home',
    data() {
        return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        zoom: 13,
        center: [52.529562,  13.413047],
        lista : null
        }
    },
    methods: {
        teste(){
            console.log(this.lista)
        }
    },
}