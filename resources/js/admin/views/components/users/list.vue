<template>
    <div class="row">
        <div class="col-md-12">
            <KTCodePreview v-bind:title="'Users'">
                <template v-slot:preview>
                    <b-container fluid>
                    <good-table list="" resourceName="" :config="config"></good-table>
                    </b-container>
                </template>
            </KTCodePreview>
        </div>
    </div>
</template>

<script>
    import KTCodePreview from "@/views/partials/content/CodePreview.vue";
    import { SET_BREADCRUMB } from "@/store/breadcrumbs.module";
    import config from './partials/list-config'
    import GoodTable from "../../../components/good-table/GoodTable";
    import ApiService from "@/common/api.service";
    import {SET_AUTH, SET_ERROR} from "../../../store/auth.module";

    export default {
        components: {
            KTCodePreview,
            GoodTable
        },
        data(){
          return{
              config: config
          }
        },
        computed: {
        },
        created() {
            console.log('bbbb',config.filters)
            console.log('iiiiiiii',config.hasOwnProperty('filters'))
        }
    }
</script>

<style scoped>

</style>
