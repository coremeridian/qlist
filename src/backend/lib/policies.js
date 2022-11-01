const formSpaceSeparatedList = (list) => list.join(" ");

const WebAppPolicy = (() => {
    const self = {
        scriptSrcAllowList: [],
        styleSrcAllowList: ["https://fonts.googleapis.com"],
        fontSrcAllowList: ["https://fonts.gstatic.com"],
        // For endpoints we would like to connect to i.e. make XHR requests, Events, WebSockets in our app
        connectSrcAllowList: ["https://*.coremeridian.xyz/"],
        frameSrcAllowList: [],
        imageSrcAllowList: [],
    };

    const generateScriptSrcPolicy = (requestId) =>
        `'self' 'nonce-${requestId}' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline' https: ${formSpaceSeparatedList(
            self.scriptSrcAllowList
        )}`;
    const generateStyleSrcPolicy = () =>
        `'self' 'unsafe-inline' ${formSpaceSeparatedList(
            self.styleSrcAllowList
        )}`;
    const generateFontSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.fontSrcAllowList)}`;
    const generateConnectSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.connectSrcAllowList)}`;
    const generateFrameSrcPolicy = () =>
        `'self' ${formSpaceSeparatedList(self.frameSrcAllowList)}`;
    const generateImageSrcPolicy = () =>
        `'self' https: data: ${formSpaceSeparatedList(self.imageSrcAllowList)}`;

    return {
        ...self,
        generateContentSecurityPolicy: (requestId) =>
            `default-src 'self'; img-src ${generateImageSrcPolicy()}; script-src ${generateScriptSrcPolicy(
                requestId
            )}; style-src ${generateStyleSrcPolicy()}; font-src ${generateFontSrcPolicy()}; connect-src ${generateConnectSrcPolicy()}; frame-src ${generateFrameSrcPolicy()}; object-src 'none';`,
    };
})();
export { WebAppPolicy };
