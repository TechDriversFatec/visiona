export default {
    data: () => ({
        icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
        ],
        items: [
        'default',
        'absolute',
        'fixed',
        ],
        padless: false,
        variant: 'default',
    }),
    computed: {
        localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
            attrs.absolute = false
            attrs.fixed = false
        } else {
            attrs[this.variant] = true
        }
        return attrs
        },
    },
}
