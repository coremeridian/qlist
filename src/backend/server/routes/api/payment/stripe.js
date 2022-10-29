const stripe = require("stripe")(
    "sk_test_51KtLhaC84SS38Mvhk0lA00a1QqCMMyhS04Q4P24BFVtzUj9r9aOH2r54n65YV8a71soBUAc12lPMonXPvgAN5P8T00E62LpvgQ"
);

const processes = {
    createProduct: async (product) => {
        try {
            await stripe.products.create({
                name: product.name,
                id: product.id,
            });
            const price = await stripe.prices.create({
                unit_amount: product.amount,
                currency: "usd",
                product: product.id,
            });
            return price.id;
        } catch (e) {
            switch (e.type) {
                case "StripeInvalidRequestError":
                    throw "Invalid request";
                default:
                    throw "Unexpected server error";
            }
        }
    },
    checkout: async (priceid) => {
        const DOMAIN = process.env.APP_URL;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceid,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${DOMAIN}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/checkout?canceled=true`,
        });

        return { sessionId: session.id, sessionUrl: session.url };
    },
};

module.exports = processes;
