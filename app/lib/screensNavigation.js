import { elementAttr, screenTypeAttr, screenTypes } from "../constants";
import { getContinueButton } from "./continueBtn";

const updateArrows = (currentScreen) => {
  // Update next arrow
  // Case without continue button
  if (currentScreen.getAttribute(screenTypeAttr) === screenTypes.radio) {
    const checkedRadio = currentScreen.querySelector(
      "input[type='radio']:checked"
    );
    if (checkedRadio) {
      nextArrow.removeAttribute(disabledAttr);
    } else {
      nextArrow.setAttribute(disabledAttr, "");
    }
  } else {
    // Cases with continue button
    const currentButton = getContinueButton(currentScreen);
    // Check if continue button exists and if it is disabled or not
    if (currentButton && !currentButton.hasAttribute(disabledAttr)) {
      nextArrow.removeAttribute(disabledAttr);
    } else {
      nextArrow.setAttribute(disabledAttr, "");
    }
  }

  // Update previous arrow
  if (
    !currentScreen.previousSibling ||
    !currentScreen.previousSibling.hasAttribute(`[${elementAttr}='screen']`)
  ) {
    previousArrow.setAttribute(disabledAttr, "");
  } else {
    previousArrow.removeAttribute(disabledAttr);
  }
};

const setProgressBar = ({ progressBar, allScreens, currentScreen }) => {
  const currentScreenIndex = allScreens.indexOf(currentScreen);
  progressBar.style.width =
    (currentScreenIndex * 100) / (allScreens.length - 1) + "%";
};

const changeScreens = ({
  currentScreen = undefined,
  elementToShow,
  isInitialState = false,
  progressBar,
  allScreens,
}) => {
  updateArrows(elementToShow);
  setProgressBar({ progressBar, allScreens, currentScreen: elementToShow });

  if (isInitialState) {
    $(allScreens).finish();
    $(elementToShow).fadeIn(400);
  } else {
    $(allScreens).finish();
    $(currentScreen).fadeOut(300, () => {
      $(elementToShow).fadeIn(400);
    });
  }
};

export const nextScreen = ({ currentScreen, progressBar, allScreens }) => {
  const elementToShow = currentScreen.nextSibling;
  //Case: is final screen
  if (
    !elementToShow ||
    !elementToShow.hasAttribute(`[${elementAttr}='screen']`)
  ) {
    quizForm.requestSubmit();
    return;
  }

  changeScreens({ currentScreen, elementToShow, progressBar, allScreens });
};

export const previousScreen = ({ currentScreen, progressBar, allScreens }) => {
  const elementToShow = currentScreen.previousSibling;
  //Case: is first screen
  if (
    !elementToShow ||
    !elementToShow.hasAttribute(`[${elementAttr}='screen']`)
  ) {
    return;
  }

  changeScreens({ currentScreen, elementToShow, progressBar, allScreens });
};

export const handleInitialState = ({ allScreens, progressBar }) => {
  const elementToShow = allScreens[0];
  changeScreens({
    elementToShow,
    isInitialState: true,
    progressBar,
    allScreens,
  });
};
