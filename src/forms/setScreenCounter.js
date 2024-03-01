import { attributes } from "../common/constants";

// Destructure attributes constant
const {els: { key, val }} = attributes;

/**
 * Add the necessary configuration to add a screen counter to the indicated form
 * @param {HTMLFormElement} form - The form element to set the display counter
 * @returns {undefined}
 */

export const setScreenCounter = (form) => {
    const screens = $(form).find(`[${key}="${val.screen}"]`);
    const currentScreen = screens.filter(":visible");

    // Define indicators
    const currentId = screens.index(currentScreen) + 1;
    const totalScreens = screens.length;

    // Update progress bar
    $(form).find(`[${key}="${val.screenNumb.total}"]`).text(totalScreens);
    $(form).find(`[${key}="${val.screenNumb.current}"]`).text(currentId);
};
