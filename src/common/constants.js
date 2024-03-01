const toolPrefix = "m8l-sf";

export const attributes = {
    els: {
        key: `${toolPrefix}-el`,
        val: {
            form: "form",
            screen: "screen",
            buttons: {
                left: "l-button",
                right: "r-button",
            },
            progressBar: "p-bar",
            screenNumb: {
                total: "sn-total",
                current: "sn-current",
            },
        },
    },
    config: `${toolPrefix}-config`,
};
