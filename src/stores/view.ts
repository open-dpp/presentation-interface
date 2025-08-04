import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductPassportDto } from "@open-dpp/api-client";

export const useProductPassportStore = defineStore("view", () => {
  const productPassport = ref<ProductPassportDto>();

  return { productPassport };
});
