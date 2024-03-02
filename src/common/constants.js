const toolPrefix = "m8l-sf";

export const attributes = {
    config: `${toolPrefix}-config`,
    els: {
        key: `${toolPrefix}-el`,
        val: {
            form: "form",
            screen: "screen",
            error: "error",
            buttons: {
                left: "l-button",
                right: "r-button",
                submit: "s-button",
            },
            progressBar: "p-bar",
            screenNumb: {
                total: "sn-total",
                current: "sn-current",
            },
        },
    },
};
