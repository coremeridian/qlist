export interface BlogPost {
    _id: string;
    title: string;
    author: string;
    authorId: string;
    content: string;
    createAt: Date;
    updatedAt: Date;
    tags: string[];
}

type BlogPosts = BlogPost[];
