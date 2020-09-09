<template>
    <div>
<!--        <export-excel :route-params="param" :excel="excel"></export-excel>-->
        <v-filter v-if="filters" :filters="filters"></v-filter>
        <b-col md="12 mb-30">
            <vue-good-table
                :rtl="direction"
                :columns="columns"
                :rows="rows"
                styleClass="table table-hover table-bordered">
                <v-table-row slot="table-row" slot-scope="props" :columns="props"
                             :paginator="paginator" :operations="operations">
                </v-table-row>
            </vue-good-table>
        </b-col>
<!--        <vue-paginator :pagination="paginator"-->
<!--                       @paginate="getRecords()"-->
<!--        >-->
<!--        </vue-paginator>-->
    </div>
</template>

<script>
    import i18nService from "@/common/i18n.service.js";
    import VuePaginator from "./VuePaginator";
    import VFilter from "../../components/FilterComponents/VFilter";
    import VTableRow from "./VTableRow";
    import ExportExcel from "./ExportExcel";
    import {mapGetters} from "vuex";

    export default {
        props:{
            list: {
                type: Object,
                required: true
            },
            resourceName:{
                required: true
            },
            config:{
                type: Object,
                required: true
            }
        },
        components: {
            VuePaginator,
            VFilter,
            VTableRow,
            ExportExcel
        },
        data() {
            return {
                paginator: null,
                errorMSG: this.$t('error_connect'),
                rows: [],
                param: {},
            }
        },
        computed: {
            columns(){
                return this.config.hasOwnProperty('columns') ? this.config.columns : null
            },
            excel(){
                return this.config.hasOwnProperty('excel') ? this.config.excel : null
            },
            operations(){
                return this.config.hasOwnProperty('operations') ? this.config.operations : null
            },
            filters(){
                return this.config.hasOwnProperty('filters') ? this.config.filters : null
            },
            direction(){
                return i18nService.getActiveLanguage() === 'ar' ? true : false
            }
        },
        methods: {
            getRecords() {
                let self = this
                let link = this.list;
                // this.request(link, {params: self.param}, function (data) {
                //     self.rows = data.data
                //     self.paginator = data.paginator
                // })
                self.rows = this.config.rows
            },
            async getQueries() {
                return this.$route.query
            },
        },
        created() {
            let self = this
            this.getQueries().then(result => {
                if (!result.page) {
                    self.param = Object.assign({}, {...result, page: 1})
                    self.$router.push({query: {...result, page: 1}})
                } else {
                    self.param = Object.assign({}, {...result})
                    self.getRecords()
                }
            })
        },
        watch: {
            '$route.query': function (page) {
                let self = this
                this.getQueries().then(result => {
                    if (!result.page) {
                        self.$router.push({query: {...result, page: 1}})
                    }
                    self.param = Object.assign({}, {...result})
                    console.log(self.param)
                    self.getRecords()
                })
            },
            title: function (value) {

            }
        }

    }
</script>

<style scoped>
</style>
