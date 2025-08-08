import { defineStore } from "pinia";
import { ref } from "vue";
import { ProductPassportDto } from "@open-dpp/api-client";

export const useProductPassportStore = defineStore("productPassport", () => {
  const productPassport = ref<ProductPassportDto>();

  const findSubSections = (sectionId: string) => {
    return productPassport.value?.dataSections.filter(
      (s) => s.parentId === sectionId,
    );
  };

  const findSection = (sectionId: string) => {
    return productPassport.value?.dataSections.find((s) => s.id === sectionId);
  };

  return { productPassport, findSubSections, findSection };
});
