<template>
    <b-container class="mb-3" v-if="excel">
        <b-row class="">
            <b-col md="1">
                <span>{{$t('export_data_to_excel')}}</span>
            </b-col>
            <b-col>
                <b-button class="mr-2" v-for="(ex, index) in excel.types" :key="index" pill :variant="ex.class" @click="exportList(excel.service,ex.type)">
                    <i :class="ex.icon"></i>
                    {{ ex.title }}
                </b-button>
            </b-col>
        </b-row>
<!--        <b-row class="mb-3">-->
<!--        </b-row>-->
    </b-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        props:{
            routeParams: {
                type: Object,
                required: true
            },
            excel:{
                required: true
            }
        },
        data(){
            return{
            }
        },
        methods:{
            exportList(service,ex){
                let self = this
                let link = this.endpoints[service.end_point](this.$route.params.id)[service.action];
                let newParams = Object.assign({},{...self.routeParams, type: ex})
                this.request(link, {params: newParams}, function (data) {
                    self.updateURLParameter(data.url,'access',self.$store.getters['Auth/getAuth'].access_token)
                })
            },
            updateURLParameter(url, param, paramVal, remove = false) {
                let newAdditionalURL = '', tempArray = url.split('?'), baseURL = tempArray[0], additionalURL = tempArray[1],rows_txt = '';

                if (additionalURL)
                    newAdditionalURL = decodeURI(additionalURL) + '&';

                if (remove)
                    newAdditionalURL = newAdditionalURL.replace(param + '=' + paramVal, '');
                else
                    rows_txt = param + '=' + paramVal;
                window.location = (baseURL + "?" + newAdditionalURL + rows_txt).replace('?&', '?').replace('&&', '&').replace(/\&$/, '')
            }
        },
        created() {
        }
    }
</script>

<style scoped>
.export{
    border-radius: 25px;
    border: 2px solid #fff1d3;
}
</style>
