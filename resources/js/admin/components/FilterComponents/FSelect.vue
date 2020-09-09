<template>
    <b-form-group :id="`input-${filter.title}`" :label="$t(filter.title)" :label-for="filter.title">
        <b-form-select
            :id="filter.title"
            v-model="selected"
            placeholder=""
            :options="filter.options"
            @change="onChange($event,filter.title)"
        ></b-form-select>
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
        data(){
            return{
                selected: null
            }
        },
        methods:{
            onChange(val,title){
                if (val === null)
                    return
                let self = this
                self.$router
                    .push({
                        query: {
                            ...self.$route.query,
                            [title]: val
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>
