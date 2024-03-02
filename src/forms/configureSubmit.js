import { attributes } from "../common/constants";
import { showError } from "../helpers/helpers";

// Destructure attributes constant
const {
    els: { key, val },
} = attributes;

/**
 * Evaluate the form components to verify if completed entries are completed correctly.
 * @param {HTMLFormElement} form - The form element handle
 * @returns {undefined}
 */
const checkErrors = (form) => {
    const screens = $(form).find(`[${key}=${val.screen}]`);
    const errors = screens
        .map(function (screenIndex) {
            const invalidFields = $(this)
                .find("[required]")
                .filter(function () {
                    return !$(this).val() || !this.validity.valid;
                });
            return invalidFields.length > 0 ? screenIndex + 1 : null;
        })
        .get()
        .filter((screenIndex) => screenIndex !== null);

    if (errors.length === 0) return;
    const errorMessage = `Please complete the required fields on the screen${
        errors.length > 1 ? "s" : ""
    }: ${errors.join(", ")}`;
    showError(form, errorMessage);
};

/**
 * Add the necessary configuration to handle form submit intent
 * @param {HTMLFormElement} form - The form element handle
 * @returns {undefined}
 */
export const configureSubmit = (form) => {
    const $sButton = $(form).find(`[${key}="${val.buttons.submit}"]`);

    // Add listeners to check submit intents
    $sButton.on("click", () => checkErrors(form));
    $(form).on("keypress", (e) => (e.which == 13 ? checkErrors(form) : null));
};
