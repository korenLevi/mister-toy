


<template>


   <!-- <ul v-for="toy in toys" :key="toy._id">
    <toy-preview class="toy-preview" :toy="toy"></toy-preview> 
   </ul> -->

    <ul class="toy-list">
        
        <toy-preview v-for="toy in toys" 
        :toy="toy"
        :key="toy._id"
        @remove="remove(toy._id)"
         class="toy-preview" ></toy-preview>
    </ul>
  

</template>

<script>
import toyPreview from './toy-preview.vue'
export default {
    props: {
        toys: {
            type: Array,
            required: true,
        }
    },
    methods: {
        remove(toyId) {
            this.$emit("remove", toyId);
        },
    },
    components: {
        toyPreview,
    },
}
</script>

