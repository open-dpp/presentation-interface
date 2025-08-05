import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../router";
import View from "./View.vue";
import { SectionType } from "@open-dpp/api-client";
import {
  dataFieldFactory,
  dataSectionFactory,
  productPassportFactory,
} from "../testing-utils/fixtures/product-passport.factory";

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});

describe("<View />", () => {
  const dataField1 = dataFieldFactory.build();
  const dataField2 = dataFieldFactory.build();
  const dataSection1 = dataSectionFactory
    .addDataField(dataField1)
    .addDataField(dataField2)
    .addDataValue(dataField1.id, "f1 value")
    .addDataValue(dataField2.id, "f2 value")
    .addDataValue(dataField1.id, "f1 value, row 1", 1)
    .addDataValue(dataField2.id, "f2 value, row 1", 1)
    .build();

  const dataField3 = dataFieldFactory.build();
  const dataField4 = dataFieldFactory.build();
  const dataSection2 = dataSectionFactory
    .addDataField(dataField3)
    .addDataField(dataField4)
    .addDataValue(dataField3.id, "f3 value")
    .addDataValue(dataField4.id, "f4 value")
    .addDataValue(dataField3.id, "f3 value, row 1", 1)
    .addDataValue(dataField4.id, "f4 value, row 1", 1)
    .build({ type: SectionType.REPEATABLE });

  const productPassport = productPassportFactory
    .addDataSection(dataSection1)
    .addDataSection(dataSection2)
    .build();
  const uuid = productPassport.id;
  const apiPath = `/product-passports/${uuid}`;

  it("renders sections at root level and navigates to row 1 entry", () => {
    cy.intercept("GET", apiPath, {
      statusCode: 200,
      body: productPassport,
    }).as("getProductPassport");
    cy.wrap(router.push(`/${uuid}`));
    cy.mountWithPinia(View, { router });
    cy.wait("@getProductPassport").its("response.statusCode").should("eq", 200);
    cy.spy(router, "push").as("pushSpy");
    cy.get('[data-cy="content"]').within(() => {
      cy.contains(dataSection1.name).should("be.visible");
      cy.contains(dataField1.name).should("be.visible");
      cy.contains("f1 value").should("be.visible");
      cy.contains(dataField2.name).should("be.visible");
      cy.contains("f2 value").should("be.visible");

      cy.contains("f1 value, row 1").should("not.exist");
      cy.contains("f2 value, row 1").should("not.exist");

      cy.contains(dataSection2.name).should("be.visible");
      cy.contains(dataField3.name).should("be.visible");
      cy.contains("f3 value").should("be.visible");
      cy.contains(dataField4.name).should("not.be.visible");
      cy.get("a").contains("Mehr Infos").should("be.visible");
      cy.get(`[data-cy="${dataSection2.id}_1"]`).click();
      cy.get("@pushSpy").should(
        "have.been.calledWith",
        `?sectionId=${dataSection2.id}&row=1`,
      );
    });
  });

  it("renders specific row of repeatable section", () => {
    cy.intercept("GET", apiPath, {
      statusCode: 200,
      body: productPassport,
    }).as("getProductPassport");
    cy.wrap(router.push(`/${uuid}?sectionId=${dataSection2.id}&row=1`));
    cy.mountWithPinia(View, { router });
    cy.wait("@getProductPassport").its("response.statusCode").should("eq", 200);

    cy.get('[data-cy="content"]').within(() => {
      cy.contains(dataSection1.name).should("not.exist");
      cy.contains(dataSection2.name).should("be.visible");
      cy.contains(dataField3.name).should("be.visible");
      cy.contains("f3 value").should("be.visible");
      cy.contains(dataField4.name).should("be.visible");
      cy.contains("f4 value").should("be.visible");
    });
  });

  it("renders repeatable section for large displays", () => {
    cy.intercept("GET", apiPath, {
      statusCode: 200,
      body: productPassport,
    }).as("getProductPassport");
    cy.wrap(router.push(`/${uuid}`));
    cy.mountWithPinia(View, { router });
    cy.viewport(1920, 1080);
    cy.wait("@getProductPassport").its("response.statusCode").should("eq", 200);

    cy.get('[data-cy="content"]').within(() => {
      cy.contains(dataSection2.name).should("be.visible");
      cy.contains(dataField3.name).should("be.visible");
      cy.contains("f3 value").should("be.visible");
      cy.contains(dataField4.name).should("be.visible");
      cy.contains("f4 value").should("be.visible");
      cy.get("a").contains("Mehr Infos").should("be.visible");
    });
  });
});
