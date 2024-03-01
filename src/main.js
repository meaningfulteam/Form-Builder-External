import { attributes } from "./common/constants";
import { setFormConfig } from "./forms/setFormConfig";

// Destructure attributes constant
const {
    els: { key, val },
} = attributes;

/**
 * Initialize form settings for each form on the current landing page
 * @returns {undefined}
 */

export const initializeForms = () => {
    const formEls = document.querySelectorAll(`[${key}="${val.form}"]`);
    formEls.forEach((form) => setFormConfig(form));
};
