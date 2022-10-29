const blog = new require("@koa/router")({ prefix: "/blog" });

const BlogPost = (async () =>
    (await require("../../db/mongoose/conn").connect("blog")).model(
        "BlogPost"
    ))();

const DoesNotExistError = {
    error: "This blog post does not appear to exist!",
};

blog.param("id", async (id, ctx, next) => {
    try {
        ctx.blog = await (await BlogPost).findOne({ _id: id });
        if (!ctx.blog) return (ctx.status = 404);
        return next();
    } catch (e) {
        console.log(e);
    }
});

blog.get("/", async (ctx) => {
    ctx.body = await (await BlogPost).find();
}).post("/", async (ctx) => {
    const post = ctx.req.body;
    console.log(post, post.title, post.author, post.content);
    const blogPost = new (await BlogPost)({
        title: post.title,
        author: post.author,
        content: post.content,
        tags: post.tags,
    });
    let result = blogPost;
    ctx.status = 201;
    await blogPost.save((err) => {
        result = err;
        ctx.status = 400;
        console.log(result);
    });
    ctx.body = result;
});

blog.get("/:id", async (ctx) => {
    ctx.body = ctx.blog;
})
    .patch("/:id", async (ctx) => {
        const { title } = ctx.req.body.post;
        ctx.blog = { ...ctx.blog, title };
        await ctx.blog.save();
        ctx.body = ctx.blog;
    })
    .delete("/:id", async (ctx) => {
        try {
            await (await BlogPost).delete({ _id: req.params.id });
            ctx.status = 204;
        } catch {
            ctx.body = DoesNotExistError;
        }
    });

blog.get("/author/:id", async (ctx) => {
    ctx.body = await (await BlogPost).find({ author: ctx.params.id });
});

module.exports = blog.use(blog.allowedMethods());
