<template>
    <div class="row">
        <div class="col-md-12">
            <KTCodePreview v-bind:title="'Create Customer'">
                <template v-slot:preview>
                    <b-container fluid>
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                            <b-row class="my-1" v-for="(type, index) in types" :key="type">
                                <b-col sm="3">
                                    <label :for="`type-${type}`">{{form[index].label}}</label>
                                </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        :id="`type-${type}`"
                                        :type="type"
                                        v-model="form[index].value"
                                        :name="form[index].name"
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-button type="submit" variant="primary">Submit</b-button>
                            <b-button class="ml-2" type="reset" variant="danger">
                                Reset
                            </b-button>
                        </b-form>
                    </b-container>
                </template>
            </KTCodePreview>
        </div>
    </div>
</template>

<script>
    import KTCodePreview from "@/views/partials/content/CodePreview.vue";
    import { SET_BREADCRUMB } from "@/store/breadcrumbs.module";

    export default {
        name: "Index",
        data() {
            return {
                types: [
                    "text",
                    "email",
                    "password",
                    "number",
                ],
                form: [
                    {
                        name:'name',
                        label: 'Name',
                        value:''
                    },
                    {name:'email', label: 'Email', value:''},
                    {name:'password', label: 'Password', value:''},
                    {name:'mobile', label: 'Mobile', value:''},
                ],
                show: true,
            }
        },
        components: {
            KTCodePreview
        },
        computed: {
            nameState() {
                return this.name.length > 2;
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.form));
            },
            onReset(evt) {
                evt.preventDefault();
                // Reset our form values
                this.form[0].value = "";
                this.form[1].value = "";
                this.form[2].value = "";
                this.form[3].value = "";
                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            }
        },
        mounted() {
            this.$store.dispatch(SET_BREADCRUMB, [
                { title: "Vue Bootstrap", route: "builder" },
                { title: "Index Customer" },
            ]);
        },
        created() {
            this.request(
                this.route('users.fetch'),
                {},
                function (response) {
                    console.log('cccccc', response)
                },
                function () {

                }
            );
        }
    }
</script>

<style scoped>

</style>
