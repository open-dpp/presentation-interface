// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import "../plugins/tailwind";
import { mount } from "cypress/vue";
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
import { createPinia, Pinia, setActivePinia } from "pinia";
import { diff } from "jest-diff";
import _ from "lodash";

let pinia: Pinia;

// Run this code before each *test*.
beforeEach(() => {
  // New Pinia
  pinia = createPinia();

  // Set current Pinia instance
  setActivePinia(pinia);
});

Cypress.Commands.add("mountWithPinia", (component, options = {}) => {
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];

  if (options.router) {
    options.global.plugins.push({
      install(app) {
        app.use(options.router);
      },
    });
  }

  // const RootWithSafelist = defineComponent({
  //   render() {
  //     return h("div", {}, [
  //       h(SafelistTailwindCss, { key: "safelist" }),
  //       h(component, { key: "component" }),
  //     ]);
  //   },
  // });

  return mount(component, {
    ...options,
    global: {
      ...options?.global,
      plugins: [...options.global.plugins, pinia],
    },
  });
});
Cypress.Commands.add("mount", mount);

Cypress.Commands.add("expectDeepEqualWithDiff", (actual, expected) => {
  if (!_.isEqual(actual, expected)) {
    console.log("🔍 Deep diff:\n", diff(expected, actual));
  }
  expect(actual).to.deep.equal(expected);
});
