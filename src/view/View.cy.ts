import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../router";
import View from "./View.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});

describe("<View />", () => {
  it("renders drafts and creates a new one", () => {
    const uuid = "uuid1";

    cy.wrap(router.push(`/uuid`));
    cy.mountWithPinia(View, { router });

    cy.contains("Verbindungen").should("be.visible");
    cy.contains("Alle Ihre Verbindungen").should("be.visible");
  });
});
