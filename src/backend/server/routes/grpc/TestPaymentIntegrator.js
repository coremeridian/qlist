const fs = require("fs");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
const PROTO_PATH = isProduction
    ? path.resolve("./test_integrator.link.proto")
    : path.resolve("src/backend/proto/test_integrator.link.proto");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const integrator =
    grpc.loadPackageDefinition(packageDefinition).testpaymentintegrator;
const client = new integrator.TestPaymentIntegrator(
    isProduction ? process.env.TESTSGRPC_PROD : process.env.TESTSGRPC_DEV,
    isProduction
        ? grpc.credentials.createInsecure()
        : grpc.credentials.createSsl(
            fs.readFileSync(process.env.CA_CERT),
            fs.readFileSync(process.env.CLIENT_KEY),
            fs.readFileSync(process.env.CLIENT_CERT)
        )
);

module.exports = client;
