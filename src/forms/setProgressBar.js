import { attributes } from "../common/constants";

// Destructure attributes constant
const {els: { key, val }} = attributes;

/**
 * Add the necessary configuration to add a progress bar to the indicated form
 * @param {HTMLFormElement} form - The form element to set the progress bar to
 * @returns {undefined}
 */

export const setProgressBar = (form) => {
    const screens = $(form).find(`[${key}="${val.screen}"]`);
    const currentScreen = screens.filter(":visible");

    // Calculate progress percentage
    const progressPercentage =
        (screens.index(currentScreen) / (screens.length - 1)) * 100;

    // Update progress bar
    const progressBar = $(form).find(`[${key}="${val.progressBar}"]`);

    //-------------------
    // TBD: PROGRESS BAR ANIMATION
    // EX:
    //  progressBar.css("transition", "width 0.25s ease");
    //-------------------

    progressBar.css("width", `${progressPercentage}%`);
};
