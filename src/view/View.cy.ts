import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../router";
import View from "./View.vue";
import { SectionType, DataFieldType } from "@open-dpp/api-client";
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
  const dataField2 = dataFieldFactory.build({
    type: DataFieldType.PRODUCT_PASSPORT_LINK,
  });
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

  const dataField5 = dataFieldFactory.build();
  const dataField6 = dataFieldFactory.build();

  const dataSection3 = dataSectionFactory
    .addDataField(dataField5)
    .addDataField(dataField6)
    .addDataValue(dataField5.id, "f5 value")
    .addDataValue(dataField6.id, "f6 value")
    .addDataValue(dataField5.id, "f5 value, row 1", 1)
    .addDataValue(dataField6.id, "f6 value, row 1", 1)
    .build();

  const dataField7 = dataFieldFactory.build();
  const dataField8 = dataFieldFactory.build();

  const dataSection4 = dataSectionFactory
    .addDataField(dataField7)
    .addDataField(dataField8)
    .addDataValue(dataField7.id, "f7 value")
    .addDataValue(dataField8.id, "f8 value")
    .addDataValue(dataField7.id, "f7 value, row 1", 1)
    .addDataValue(dataField8.id, "f8 value, row 1", 1)
    .build();

  const productPassport = productPassportFactory
    .addDataSection(dataSection1)
    .addDataSection(dataSection2)
    .addDataSection(dataSection3, dataSection2.id)
    .addDataSection(dataSection4, dataSection1.id)
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
      cy.contains(productPassport.name).should("be.visible");
      cy.contains(productPassport.id).should("be.visible");
      cy.contains(dataSection1.name).should("be.visible");
      cy.contains(dataField1.name).should("be.visible");
      cy.contains("f1 value").should("be.visible");
      cy.contains(dataField2.name).should("be.visible");
      cy.contains("Aufrufen").should("be.visible");

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
        `?sectionId=${dataSection2.id}&row=1&parentSectionId=${dataSection2.id}`,
      );
    });
  });

  it("renders sub sections and navigates to one of them", () => {
    cy.intercept("GET", apiPath, {
      statusCode: 200,
      body: productPassport,
    }).as("getProductPassport");
    cy.wrap(router.push(`/${uuid}`));
    cy.mountWithPinia(View, { router });
    cy.wait("@getProductPassport").its("response.statusCode").should("eq", 200);
    cy.spy(router, "push").as("pushSpy");
    cy.get('[data-cy="content"]').within(() => {
      cy.contains(dataSection4.name).should("be.visible");
      cy.contains(dataField5.name).should("not.exist");
      cy.get(`[data-cy="${dataSection4.id}"]`).click();
      cy.get("@pushSpy").should(
        "have.been.calledWith",
        `?sectionId=${dataSection4.id}&row=0&parentSectionId=${dataSection1.id}`,
      );
    });
  });

  it("renders sub sections in table and navigates to one of them", () => {
    cy.intercept("GET", apiPath, {
      statusCode: 200,
      body: productPassport,
    }).as("getProductPassport");
    cy.viewport(1920, 1080);

    cy.wrap(router.push(`/${uuid}`));
    cy.mountWithPinia(View, { router });
    cy.wait("@getProductPassport").its("response.statusCode").should("eq", 200);
    cy.spy(router, "push").as("pushSpy");
    cy.get('[data-cy="content"]').within(() => {
      cy.contains(dataSection3.name).should("be.visible");
      cy.get(`[data-cy="${dataSection3.id}_1"]`).click();
      cy.get("@pushSpy").should(
        "have.been.calledWith",
        `?sectionId=${dataSection3.id}&row=1&parentSectionId=${dataSection2.id}`,
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

  it("renders sidebar for root level and navigate to section and back", () => {
    cy.intercept("GET", apiPath, {
      statusCode: 200,
      body: productPassport,
    }).as("getProductPassport");
    cy.wrap(router.push(`/${uuid}`));
    cy.mountWithPinia(View, { router });
    cy.viewport(1920, 1080);
    cy.wait("@getProductPassport").its("response.statusCode").should("eq", 200);
    cy.spy(router, "push").as("pushSpy");
    cy.get('[data-cy="sidebar"]').within(() => {
      cy.contains(dataSection1.name).should("be.visible");
      cy.contains(dataSection2.name).should("be.visible");
      cy.contains(dataSection3.name).should("not.exist");
      cy.contains(dataSection4.name).should("not.exist");
      cy.get("a").contains(dataSection1.name).click();
      cy.get("@pushSpy")
        .should(
          "have.been.calledWith",
          `?sectionId=${dataSection1.id}&row=0&parentSectionId=${undefined}`,
        )
        .then(() => {
          cy.contains(dataSection1.name).should("not.exist");
          cy.contains(dataSection2.name).should("not.exist");
          cy.contains(dataSection3.name).should("not.exist");
          cy.contains(dataSection4.name).should("be.visible");
          cy.get("a").contains("Zurück").click();
          cy.get("@pushSpy").should(
            "have.been.calledWith",
            `?sectionId=${dataSection1.id}&row=0&parentSectionId=${undefined}`,
          );
        });
    });
  });
});
