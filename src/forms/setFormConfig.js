import { getFormLength, getConfig } from "../helpers/helpers";
import { setControls } from "./setFormControls";
import { setInitialState } from "./setInitialState";

/**
 * Set the entire form logic based on the configuration attribute
 * @param {HTMLFormElement} form - The form element to be configured
 * @returns {undefined}
 */

export const setFormConfig = (form) => {
    // Get form specs
    const config = getConfig(form);
    const formLength = getFormLength(form);

    // Set initial state
    setInitialState(form);

    // Set buttons handlers
    setControls(form);

    if (config.progressBar) setProgressBar(form, formLength);
    if (config.screenCounter) setScreenCounter(form, formLength);
};
