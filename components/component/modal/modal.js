var Vue = require('vue');



module.exports = Vue.component('modal', {
    props: {
        'show': {
            type: Boolean,
            required: true,
            twoWay: true
        }
    },
    template: require('./modal.html'),
    data: function() {
        return {
            // showModal: false
        }
    },
    watch: {
    },
    created: function() {
    },
    methods: {
        
    }
});
