<template>
    <div>
        <span v-if="columns.column.field === 'no'">

                         {{ (paginator.per_page * (paginator.current_page - 1)) + (columns.index + 1)}}
                        </span>
        <span v-else-if="columns.column.field === 'status'"
              :class="columns.formattedRow[columns.column.field] == 0 ? 'kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill' : 'kt-badge  kt-badge--success kt-badge--inline kt-badge--pill'">
                                    {{columns.formattedRow[columns.column.field] == 0 ? $t('inactive') : $t('active')}}
                                </span>
        <b-img v-else-if="columns.column.field === 'image'" :src="columns.formattedRow[columns.column.field]"
               style="width:80px;height:80px" @click="zoomImage"></b-img>
        <span v-else>
                    {{columns.formattedRow[columns.column.field]}}
        </span>
    </div>
</template>

<script>
    import {eventList} from "../../events/event-bus-list";

    export default {
        props: {
            columns: {
                type: Object,
                required: true
            },
            paginator: {
                type: Object,
                required: true
            },
            operations: {
                type: Object,
                required: true
            }
        },
        created() {
        },
        methods: {
            fireEvent(fire, field) {
                eventList.$emit(fire, field)
            },
            zoomImage(event) {
                this.$emit('zoom-image', event.target.attributes.src.nodeValue)
            }
        }
    }
</script>

<style scoped>

</style>
