import { attributes } from "../common/constants";
import { changeScreen } from "../helpers/helpers";

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
export const setControls = (form, config) => {
    // Get controls
    const $lButton = $(form).find(`[${key}="${val.buttons.left}"]`);
    const $rButton = $(form).find(`[${key}="${val.buttons.right}"]`);

    // Set "L" control
    $lButton.on("click", () => {
        try {
            changeScreen({ form, direction: "prev", config });
            const currentScreen = $(form).find(
                `[${key}="${val.screen}"]:visible`
            );
            const prevScreen = currentScreen.prev(`[${key}="${val.screen}"]`);
            if (prevScreen.length === 0) $lButton.hide(); // Hide the "L" button if you go back to the first screen
            $rButton.show(); // Show "R" button when going back
        } catch (error) {
            console.error(error.message);
        }
    });

    // set "R" control
    $rButton.on("click", () => {
        try {
            changeScreen({ form, direction: "next", config });
            const currentScreen = $(form).find(
                `[${key}="${val.screen}"]:visible`
            );
            const nextScreen = currentScreen.next(`[${key}="${val.screen}"]`);
            if (nextScreen.length === 0) $rButton.hide(); // Hide "R" button if there are no more screens to advance
            $lButton.show(); // Show "L" button when moving forward
        } catch (error) {
            console.error(error.message);
        }
    });
};
