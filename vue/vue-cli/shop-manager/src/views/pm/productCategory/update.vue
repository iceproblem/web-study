<template>
    <div>
        <ProductCateAddOrEdit :isUpdate="true"></ProductCateAddOrEdit>
    </div>
</template>

<script>
    import ProductCateAddOrEdit from "../productCategory/components/ProductCateAddOrEdit";
    export default {
        name: "update",
        components:{
            ProductCateAddOrEdit
        }
    }
</script>

<style scoped>

</style>
