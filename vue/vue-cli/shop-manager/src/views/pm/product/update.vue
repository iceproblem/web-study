<template>
    <div>
        <ProductDetail :isUpdate="true"></ProductDetail>
    </div>
</template>

<script>
    import ProductDetail from "./components/productDetail"
    export default {
        name: "updata",
        components:{
            ProductDetail
        }
    }
</script>

<style scoped>

</style>
