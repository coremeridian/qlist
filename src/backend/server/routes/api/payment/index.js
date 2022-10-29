const tpi = require("../../grpc/TestPaymentIntegrator");
const payment = new require("@koa/router")({ prefix: "/payment" });

const stripe = require("./stripe");
const StripePricings = (async () =>
    (await require("../../../db/mongoose/conn").connect("pricings")).model(
        "StripePricings"
    ))();

payment.post("/checkout/:test", async (ctx) => {
    const body = ctx.req.body;
    const keySet = {
        userId: body.userid,
        testId: body.testid,
    };
    console.log(keySet);
    tpi.qualifyUserTestAndSession(keySet, async (err, session) => {
        if (err) {
            console.log(err);
            ctx.status = 400;
            ctx.body = "Something went wrong";
        } else if (!session.isValid && session.isPermitted) {
            console.log("CREATING SESSION");
            const { sessionId, sessionUrl } = await stripe.checkout(
                body.priceid
            );

            tpi.initiateTestSession(
                {
                    ...keySet,
                    sessionId,
                    sessionUrl,
                },
                (err, _) => {
                    let result = sessionUrl;
                    if (err) {
                        ctx.status = 400;
                        result = "Unable to checkout test";
                    }
                    ctx.body = result;
                }
            );
        } else if (!session.isPermitted) {
            ctx.status = 403;
            ctx.body = "You are unable to take this test";
        } else {
            // if valid and permitted, in cases of multiple attempts
            ctx.body = session.url;
        }
    });
});

payment.post("/publishTest", async (ctx) => {
    const test = ctx.req.body;
    const id = await (await StripePricings).find({ _id: test.id });
    if (id.length == 0) {
        let priceid;
        try {
            priceid = await stripe.createProduct(test);
        } catch (e) {
            ctx.status = 400;
            ctx.body = e;
            return;
        }

        const newPrice = new (await StripePricings)({
            _id: new require("mongoose").Types.ObjectId(test.id),
            priceid: priceid,
            amount: test.amount,
        });

        let result;
        await newPrice.save((err) => {
            result = err;
            ctx.status = 400;
            console.log(result);
        });

        if (!result) {
            const data = {
                testId: test.id,
                priceId: priceid,
            };
            tpi.publishTest(data, (err, publishedData) => {
                if (err) {
                    ctx.status = 400;
                    result = "Test was not able to be published";
                    console.log(err);
                } else {
                    result = publishedData;
                }
            });
        }

        ctx.body = result;
    } else {
        ctx.body = "This test has already been published!";
    }
});

module.exports = payment.use(payment.allowedMethods());
