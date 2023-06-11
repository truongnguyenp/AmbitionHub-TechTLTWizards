import Header from "@/components/Header";
import Link from "next/link";
// import { Post } from "./createPost";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";

const jwtid = "jasdnasndknajbwknjaadad";

function Success() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-103px)]">
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-5xl text-green-400 font-bold mb-5">
            You have successfully paid!
          </p>
          <div className="px-8 py-2 bg-[#F9F0F0]  rounded-md">
            <Link href={"/"} className="text-black font-semibold">
              Go to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Success;
