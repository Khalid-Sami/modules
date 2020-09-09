<template>
    <div class="row">
        <div class="col-md-12">
            <KTCodePreview v-bind:title="'Displays Of Customer'">
                <template v-slot:preview>
                    <div>
                        <b-table
                            striped
                            hover
                            :items="data.items"
                            :fields="data.fields"
                        >
                        </b-table>
                    </div>
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
                data: {
                    fields: [
                        {
                            key: "full_name",
                            sortable: true
                        },
                        {
                            key: "email",
                            sortable: true
                        },
                        {
                            key: "mobile_number",
                            label: "Person age",
                            sortable: true,
                            // Variant applies to the whole column, including the header and footer
                            variant: "primary"
                        }
                    ],
                    items: [
                        {
                            isActive: true,
                            full_name: "Mousab Majed Salah",
                            email: "mousabsalaham@gmail.com",
                            mobile_number: 554454544
                        },
                        {
                            isActive: true,
                            full_name: "Solyman Majed Salah",
                            email: "solyman@gmail.com",
                            mobile_number: 444445552
                        },
                        {
                            isActive: true,
                            full_name: "Saji Majed Salah",
                            email: "saji@gmail.com",
                            mobile_number: 33332222
                        },
                    ]
                },
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
        },
        mounted() {
            this.$store.dispatch(SET_BREADCRUMB, [
                { title: "Vue Bootstrap", route: "builder" },
                { title: "Index Customer" },
            ]);
        }
    }
</script>

<style scoped>

</style>
