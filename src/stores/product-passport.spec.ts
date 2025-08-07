import { createPinia, setActivePinia } from "pinia";
import { useProductPassportStore } from "./product-passport";
import {
  dataSectionFactory,
  productPassportFactory,
} from "../testing-utils/fixtures/product-passport.factory";
import { SectionType } from "@open-dpp/api-client";
import { describe, it, beforeEach, expect } from "vitest";

describe("ProductPassportStore", () => {
  beforeEach(() => {
    // Create a fresh pinia instance and make it active
    setActivePinia(createPinia());
  });

  it("should find section", async () => {
    const dataSection1 = dataSectionFactory.build();
    const dataSection2 = dataSectionFactory.build({
      type: SectionType.REPEATABLE,
    });

    const productPassport = productPassportFactory
      .addDataSection(dataSection1)
      .addDataSection(dataSection2)
      .build();

    const productPassportStore = useProductPassportStore();
    productPassportStore.productPassport = productPassport;
    const found = productPassportStore.findSection(dataSection2.id);
    expect(found).toEqual(dataSection2);
  });
});
