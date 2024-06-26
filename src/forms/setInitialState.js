import { attributes } from "../common/constants";
import { setProgressBar } from "./setProgressBar";
import { setScreenCounter } from "./setScreenCounter";

// Destructure attributes constant
const {
    els: { key, val },
} = attributes;

/**
 * Set the initial state of the form element
 * @param {HTMLFormElement} form - The form element to be setted
 * @param {Object} config - configuraton object object
 * @returns {undefined}
 */
export const setInitialState = (form, config) => {
    // Reset screen config.
    const formScreens = $(form).find(`[${key}="${val.screen}"]`);
    formScreens.slice(1).hide();

    // Reset error config.
    const $error = $(form).find(`[${key}="${val.error}"]`);
    $error.hide();

    // Reset buttons config.
    const $lButton = $(form).find(`[${key}="${val.buttons.left}"]`);
    const $sButton = $(form).find(`[${key}="${val.buttons.submit}"]`);
    [$lButton, $sButton].forEach((el) => el.hide());

    // Set the progress bar configuration
    if (config.progressBar) setProgressBar(form);
    if (config.screenCounter) setScreenCounter(form);
};
