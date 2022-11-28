import { rest } from "msw";
import { apiDomain } from "@features/api";

const listOfTests = [
    {
        testId: "IAmTest",
        name: "The Almighty Test of Speed",
        description:
            "This test will blow your mind. Literally! Perhaps you don't sense the immediate danger, which is fine. However, if you are not prepared to be wrung through by a merciless nonverbal, nonreasoning test, then you're in for a world of hurting.",
        author: "Foo Barson",
    },
];

export const handlers = [
    rest.get(`tests`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(listOfTests));
    }),
    rest.get(`${apiDomain}/blog/posts`, (req, res, ctx) => {
        return res(ctx.status(401));
    }),
];
