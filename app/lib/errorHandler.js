import { elementAttr, errorClass } from "./../constants.js";

export const showError = ({ input, text, omit = false }) => {
  if (omit) return;
  const inputWrapper = input.parentElement;
  const existingMessage = inputWrapper.querySelector(
    `[${elementAttr}="error-message"]`
  );
  if (existingMessage) {
    existingMessage.innerText = text;
  } else {
    const message = document.createElement("div");
    message.classList.add(errorClass);
    message.setAttribute(elementAttr, "error-message");
    message.innerText = text;
    inputWrapper.appendChild(message);
  }
};

export const hideError = (input) => {
  const inputWrapper = input.parentElement;
  const message = inputWrapper.querySelector(
    `[${elementAttr}="error-message"]`
  );
  if (message) {
    message.remove();
  }
};
