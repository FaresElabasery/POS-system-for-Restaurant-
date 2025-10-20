import "next-auth";

declare module "next-auth" {
    interface User {
        role?: 'admin' | 'user';
    }

    interface Session {
        user: {
            role?: 'admin' | 'user';
        } & DefaultSession["user"];
    }
}