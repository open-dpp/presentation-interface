import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../router";
import View from "./View.vue";
import {
  DataFieldType,
  GranularityLevel,
  ProductPassportDto,
  SectionType,
} from "@open-dpp/api-client";

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});

describe("<View />", () => {
  it("renders drafts and creates a new one", () => {
    const uuid = "uuid1";

    const productPassport: ProductPassportDto = {
      id: uuid,
      name: "Product Name",
      description: "Product Description",
      dataSections: [
        {
          id: "s1",
          name: "section 1",
          type: SectionType.GROUP,
          parentId: undefined,
          subSections: [],
          granularityLevel: GranularityLevel.MODEL,
          dataFields: [
            {
              id: "f1",
              name: "field 1",
              type: DataFieldType.TEXT_FIELD,
              granularityLevel: GranularityLevel.MODEL,
            },
          ],
          dataValues: [
            {
              f1: "f1 value",
            },
          ],
        },
      ],
    };

    cy.intercept("GET", `/product-passports/${uuid}`, {
      statusCode: 200,
      body: productPassport, // Mock response
    }).as("getProductPassport");

    cy.wrap(router.push(`/${uuid}`));
    cy.mountWithPinia(View, { router });
    cy.wait("@getProductPassport").its("response.statusCode").should("eq", 200);
    cy.contains("section 1").should("be.visible");
  });
});
