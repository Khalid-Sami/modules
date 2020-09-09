<template>
    <b-form-group :id="`input-${filter.title}`" :label="$t(filter.title)" :label-for="filter.title">
        <b-form-input
            :id="filter.title"
            placeholder=""
            @keyup="filterInput(filter.title)"
        ></b-form-input>
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
                timeout: null
            }
        },
        methods:{
            filterInput(title){
                // clear timeout variable
                clearTimeout(this.timeout);

                let self = this;
                this.timeout = setTimeout(function () {
                    // enter this block of code after 1 second
                    let val = document.getElementById(title).value
                    self.$router
                        .push({
                            query: {
                                ...self.$route.query,
                                [title]: encodeURIComponent(val)
                            }
                        })
                        .catch(() => {
                        });
                }, 1000);
            }
        }
    }
</script>

<style scoped>

</style>
