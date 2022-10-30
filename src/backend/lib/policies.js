const formSpaceSeparatedList = (list) => list.join(" ");

const WebAppPolicy = (() => {
    const self = {
        scriptSrcAllowList: ["unsafe-eval", "unsafe-inline"],
        styleSrcAllowList: ["https://fonts.googleapis.com"],
        fontSrcAllowList: ["https://fonts.gstatic.com"],
        // For endpoints we would like to connect to i.e. make XHR requests, Events, WebSockets in our app
        connectSrcAllowList: [],
        frameSrcAllowList: [],
        imageSrcAllowList: ["https:", "data:"],
    };

    const generateScriptSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.scriptSrcAllowList)}`;
    const generateStyleSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.styleSrcAllowList)}`;
    const generateFontSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.fontSrcAllowList)}`;
    const generateConnectSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.connectSrcAllowList)}`;
    const generateFrameSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.frameSrcAllowList)}`;
    const generateImageSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.imageSrcAllowList)}`;

    return {
        ...self,
        generateContentSecurityPolicy: () =>
            `default-src 'self'; img-src ${generateImageSrcPolicy()}; script-src ${generateScriptSrcPolicy()}; style-src ${generateStyleSrcPolicy()}; font-src ${generateFontSrcPolicy()}; connect-src ${generateConnectSrcPolicy()}; frame-src ${generateFrameSrcPolicy()}; object-src 'none';`,
    };
})();
export { WebAppPolicy };
