<template>
    <b-form-group :label="$t(filter.title)">
        <b-form-input type="date" :id="`datepicker-${filter.title}`"
                      @input="filterDate($event,filter.title)"
                      :placeholder="$t('please_select')" class="mb-2" locale="ar"></b-form-input>
    </b-form-group>
</template>

<script>
    export default {
        props: {
            filter: {
                type: Object,
                required: true
            },
        },
        methods:{
            filterDate(val,title){
                this.$router
                    .push({
                        query: {
                            ...this.$route.query,
                            [title]: encodeURIComponent(val)
                        }
                    })
                    .catch(() => {
                    });
            }
        }
    }
</script>

<style scoped>

</style>
