import { elementAttr } from "../constants";

export const setProgressBar = ({ progressBar, allScreens, currentScreen }) => {
  const currentScreenIndex = allScreens.indexOf(currentScreen);
  progressBar.style.width =
    (currentScreenIndex * 100) / (allScreens.length - 1) + "%";
};
