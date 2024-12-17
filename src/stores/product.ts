import {defineStore} from 'pinia'
import {ref} from "vue";
import Product from "../types/Product.ts";

export const useProductStore = defineStore('product', () => {
    const product = ref<Product>();

    return {product}
});