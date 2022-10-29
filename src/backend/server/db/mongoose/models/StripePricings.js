const Schema = require("mongoose").Schema;

const schema = new Schema(
    {
        _id: require("mongoose").ObjectId,
        priceid: {
            type: String,
            trim: true,
            required: [true, "Need corresponding stripe price id"],
        },
        amount: {
            type: Number,
            required: [true, "Need a price value"],
        },
        tags: {
            type: [String],
            default: undefined,
        },
    },
    { timestamps: true }
);

module.exports = {
    schema: schema,
    name: "StripePricings",
};
