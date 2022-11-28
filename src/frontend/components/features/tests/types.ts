export interface Test {
    id: string;
    testid: number;
    title: string;
    description: string;
    author: string;
    authorid: number;
    content: string;
    price: string;
    priceid: string;
    created_at: Date;
    is_published: boolean;
    attempts: number;
}

export type Tests = Test[];

export type TestRequestOptions = Partial<
    Pick<Test, "author" | "title" | "attempts" | "created_at" | "price"> &
        "with_unpublished"
>;

export type TestCreationRequest = Pick<
    Test,
    "author" | "title" | "description" | "content"
> &
    Partial<Test> &
    Omit<Test, "id" | "testid" | "authorid" | "priceid">;

export type TestPublishRequest = Pick<Test, "id" | "title"> & "amount";
