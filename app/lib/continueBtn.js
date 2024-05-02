import {disabledAttr} from "./constants";

export const getContinueButton = (screen) =>
  screen.querySelector([`[${elementAttr}='next-button']`]);


export const disableContinueBtn = (screen, nextArrow) => {
  const continueButton = getContinueButton(screen);
  if (!continueButton) return; //LATER: better handle this error
  continueButton.setAttribute(disabledAttr, "");
  nextArrow.setAttribute(disabledAttr, "");
};

export const enableContinuetBtn = (screen, nextArrow) => {
  const continueButton = getContinueButton(screen);
  if (!continueButton) return; //LATER: better handle this error
  continueButton.removeAttribute(disabledAttr);
  nextArrow.removeAttribute(disabledAttr);
};

export const triggerContinueButtonOnEnter = (event, screen) => {
  if (event.key === "Enter") {
    const continueButton = getContinueButton(screen);
    continueButton.click();
  }
};