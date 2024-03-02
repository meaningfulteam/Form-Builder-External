import { getConfig } from "../helpers/helpers";
import { setControls } from "./setFormControls";
import { setInitialState } from "./setInitialState";
import { configureSubmit } from "./configureSubmit";

/**
 * Set the entire form logic based on the configuration attribute
 * @param {HTMLFormElement} form - The form element to be configured
 * @returns {undefined}
 */

export const setFormConfig = (form) => {
    // Get form specs
    const config = getConfig(form);

    // Set initial state
    setInitialState(form, config);

    // Set buttons handlers
    setControls(form, config);

    // Set submit handler
    configureSubmit(form);
};
