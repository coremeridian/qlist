import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "stream";

export default function renderFromStream(
    jsx: React.ReactElement
): Promise<string> {
    let body = "";
    const writeableStream = new Writable({
        write: (chunk, encoding, callback) => {
            body += chunk;
            setImmediate(callback);
        },
    });

    return new Promise((resolve, reject) => {
        const { pipe } = renderToPipeableStream(jsx, {
            onShellReady() {
                pipe(writeableStream);
            },
            onShellError() {},
            onError(err) {},
        });

        writeableStream.on("finish", () => {
            return resolve(body);
        });

        writeableStream.on("error", (error) => {
            return reject(error);
        });
    });
}
