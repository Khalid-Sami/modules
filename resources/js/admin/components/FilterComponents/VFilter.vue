<template>
    <b-container class="">
<!--        <b-row align-h="end">-->
<!--            <b-col cols="2">-->
<!--                <b-button style="float:left" @click.prevent="resetFilters">-->
<!--                    <b-icon icon="arrow-clockwise" variant="success"></b-icon>-->
<!--                    إعادة تعيين الفلآتر-->
<!--                </b-button>-->
<!--            </b-col>-->
<!--        </b-row>-->
        <b-card-group deck class="mb-1">
            <b-card border-variant="secondary" header="الفلآتر" header-class="text-center">
                <b-row>
                    <b-col cols="3" v-for="(filter,index) in filters" :key="index">
                        <component :is="filter.type" :filter="filter"></component>
                    </b-col>
                </b-row>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
    import FDate from "./FDate";
    import FInput from "./FInput";
    import FSelect from "./FSelect";
    import * as _ from 'lodash';
    export default {
        props: {
            filters: {
                type: Object,
                required: true
            },
        },
        components:{
            FDate,
            FSelect,
            FInput
        },
        methods: {
            resetFilters(){
                if(this.$route.query.page && _.size(this.$route.query) > 1){
                    this.$router.replace({
                        ...this.$router.currentRoute,
                        query: {
                            page: this.$route.query.page
                        }
                    })
                    // this.filters = _.cloneDeepWith(this.filters, (value) => {return _.isObject(value) ? undefined : null});
                }
                // this.filters  = _.mapValues(this.filters, value => _.isNil(value) ?  '' : value)

            }
        }
    }
</script>

<style scoped>

</style>
