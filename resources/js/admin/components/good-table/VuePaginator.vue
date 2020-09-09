<template>

    <b-col class="md-3">
        <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            align="right">
        </b-pagination>
    </b-col>

</template>
<script>
    export default {
        props: {
            pagination: {
                type: Object,
                required: true
            },
        },
        computed: {},
        methods: {
        },
        watch: {
            'pagination.current_page'(newPage, oldPage) {
                console.log('new ' + newPage + ' / old ' + oldPage)
                let self = this
                this.$router
                    .push({
                        query: {
                            ...self.$route.query,
                            page: newPage
                        }
                    })
                    .catch(() => {
                    });
            }
        }
    }
</script>
<style>

</style>
