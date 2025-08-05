import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductPassportDto } from "@open-dpp/api-client";

export const useProductPassportStore = defineStore("view", () => {
  const productPassport = ref<ProductPassportDto>();

  const findSubSections = (sectionId: string) => {
    return productPassport.value?.dataSections.filter(
      (s) => s.parentId === sectionId,
    );
  };

  return { productPassport, findSubSections };
});
