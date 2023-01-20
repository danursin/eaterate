import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

//const recipes: RecipeItem[] = [];

export default function Home() {
    const { user, error, isLoading } = useUser();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    return (
        <>
            <Head>
                <title>Eaterate</title>
            </Head>
            {!!user && <div>Welcome {user.name}</div>}
            {!user && <Link href="/api/auth/login">Login</Link>}
        </>
    );
}
