import {
  elementAttr,
  screenTypeAttr,
  interactedAttr,
  disabledAttr,
  screenTypes,
  inputWrapperAttr,
} from "./constants";
import {
  getContinueButton,
  enableContinuetBtn,
  disableContinueBtn,
  triggerContinueButtonOnEnter,
} from "./lib/continueBtn.js";
import { hideError, showError } from "./lib/errorHandler.js";
import {
  nextScreen,
  previousScreen,
  handleInitialState,
} from "./lib/screensNavigation.js";

const forms = document.querySelectorAll(`[${elementAttr}="form"]`);

forms.forEach((form) => {
  const allScreens = form.querySelectorAll(`[${elementAttr}='screen']`);
  const nextArrow = form.querySelector(`[${elementAttr}='next-arrow']`);
  const previousArrow = form.querySelector(`[${elementAttr}='previous-arrow']`);

  // Handle Screens formats and conditions
  allScreens.forEach((screen) => {
    // Configure Screens type "field"
    if (screen.getAttribute(screenTypeAttr) === screenTypes.fields) {
      const fieldsSelectors =
        "select, input[type='text'], input[type='email'], input[type='tel'], input[type='number']";
      const fieldsArr = screen.querySelectorAll(fieldsSelectors);
      const phoneInputs = screen.querySelectorAll("input[type='tel']");
      //TODO: handle more than one phone input per screen
      let itiArray = [];

      if (phoneInputs.length != 0) {
        phoneInputs.forEach((phoneInput) => {
          let iti;
          if (phoneInput) {
            iti = window.intlTelInput(phoneInput, {
              utilsScript:
                "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
              separateDialCode: true,
              initialCountry: "auto",
              geoIpLookup: function (callback) {
                fetch("https://ipapi.co/json")
                  .then(function (res) {
                    return res.json();
                  })
                  .then(function (data) {
                    callback(data.country_code);
                  })
                  .catch(function () {
                    callback("mx");
                  });
              },
            });
          }
          itiArray.push(iti);
        });
      }

      const validateFields = () => {
        let validation = true;
        for (field of fieldsArr) {
          const interacted = field.hasAttribute(interactedAttr);
          // Case: field type select, text or number
          if (
            field.tagName === "SELECT" ||
            field.type === "text" ||
            field.type === "number"
          ) {
            if (field.value) {
              hideError(field);
            } else {
              disableContinueBtn(screen, nextArrow);
              showError({
                input: field,
                text: "Este campo es requerido",
                omit: !interacted,
              });
              validation = false;
            }
            continue;
          }

          // Case: field type email
          if (field.type === "email") {
            const emailRegex =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailRegex.test(field.value)) {
              hideError(field);
            } else {
              disableContinueBtn(screen, nextArrow);
              showError({
                input: field,
                text: "El correo electrónico no es válido",
                omit: !interacted,
              });
              validation = false;
            }
            continue;
          }

          // Case: field type phone
          if ([...phoneInputs].some((phoneInput) => phoneInput === field)) {
            const itiIndex = [...phoneInputs].indexOf(field);
            const inputWrapper = field.closest(`[${inputWrapperAttr}]`);
            const fullPhoneInput = inputWrapper.querySelector(
              "input[type='hidden'][data-name='phone']"
            );

            if (itiArray[itiIndex].isPossibleNumber()) {
              //When number is Valid
              fullPhoneInput.value = itiArray[itiIndex].getNumber();
              hideError(field);
            } else {
              //When number is Invalid
              disableContinueBtn(screen, nextArrow);
              showError({
                input: field,
                text: "El número no es válido",
                omit: !interacted,
              });
              validation = false;
            }
            continue;
          }
        }

        if (validation) {
          enableContinuetBtn(screen, nextArrow);
        }
      };

      //Run initial validation
      validateFields();

      fieldsArr.forEach((field) => {
        field.addEventListener("input", (e) => {
          validateFields();
        });

        field.addEventListener("focusout", (e) => {
          field.setAttribute(interactedAttr, "");
          validateFields();
        });

        field.addEventListener("keydown", (e) => {
          triggerContinueButtonOnEnter(e, screen);
        });
      });

      if (phoneInputs.length != 0) {
        phoneInputs.forEach((phoneInput) => {
          phoneInput.addEventListener("countrychange", (e) => {
            validateFields();
          });
        });
      }
      return;
    }
  });

  // Configure general Next Buttons
  allScreens.forEach((screen) => {
    if (screen.getAttribute(screenTypeAttr) === screenTypes.radio) {
      // Cases without "continue" button
      const radioButtons = screen.querySelectorAll("input[type='radio']");
      if (!radioButtons) {
        console.log(
          `Missing radio buttons at screen ${allScreens.indexOf(screen)}`
        );
      }
      radioButtons.forEach((radio) => {
        radio.addEventListener("click", (e) => {
          if (e.target.checked) {
            nextScreen({ currentScreen: screen, progressBar, allScreens }); // TODO: add progress bar definition
          }
        });
      });
    } else {
      // Cases with "continue" button
      const continueButton = getContinueButton(screen);

      if (!continueButton) {
        console.log(`Missing continue button at ${allScreens.indexOf(screen)}`);
        return;
      }

      continueButton.addEventListener("click", (e) => {
        if (continueButton.hasAttribute(disabledAttr)) return;
        nextScreen({ currentScreen: screen, progressBar, allScreens }); // TODO: add progress bar definition
      });
    }
  });

  // Handle initial screen
  handleInitialState({ progressBar, allScreens });

  // Handle Arrows events
  nextArrow.addEventListener("click", (e) => {
    if (nextArrow.hasAttribute(disabledAttr)) return;
    //TODO: get current screen somehow
    nextScreen();
  });

  previousArrow.addEventListener("click", (e) => {
    if (previousArrow.hasAttribute(disabledAttr)) return;
    //TODO: get current screen somehow
    previousScreen();
  });
});
