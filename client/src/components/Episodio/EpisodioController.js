import Episodios from '../../service/episodios'

export default {
    mounted () {
        Episodios.pegarDadosEp(this.$route.params.ep).then(resposta =>{
            this.dadosEp = resposta.data;
            this.playerOptions.poster = this.dadosEp.thumbnail;
        })
    },
    watch: {
        $route() {
            location.reload()
        }
    },
    created() {
        this.playerOptions.src = "https://drive.google.com/file/d/1ovgMMdsZFrT7Z2mvybY75lKzQ-F_peGo/preview"
    },

    data(){
        return {
            dadosEp: [],
            ep: this.$route.params.ep,
            playerOptions: {
                autoplay: false,
                muted: false,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                  type: "video/mp4",
                  src: null
                }],
                poster: null,
            }
        }
    },
    methods: {
        formatarNum(num){
          num = ("00" + num.toString()).slice(-3);
          return num
        },
        proxPag(){
            this.link = '/episodio/'+(Number(this.ep)+1).toString()
            this.$router.push(this.link)
        },
        pagAnte(){
            this.link = '/episodio/'+(Number(this.ep)-1).toString()
            this.$router.push(this.link)
        }
    },
    computed: {
        player() {
          return this.$refs.videoPlayer.player
        }
      },
};