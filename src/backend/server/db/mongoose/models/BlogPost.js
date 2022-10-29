const Schema = require("mongoose").Schema;

const schema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            minLength: [3, "Title must be greater than 3 characters"],
            maxLength: [50, "Title cannot be greater than 50 characters"],
            required: [true, "Need a title"],
        },
        author: {
            type: String,
            trim: true,
            minLength: [3, "Author must be greater than 3 characters"],
            maxLength: [30, "Author cannot be greater than 30 characters"],
            required: [true, "Need an author"],
        },
        content: {
            type: String,
            trim: true,
            minLength: [100, "Content is too short"],
            maxLength: [3000, "Content is too long"],
            required: [true, "Need content to post"],
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
    name: "BlogPost",
};
