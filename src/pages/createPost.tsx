import { getAllPost, getProfileAccount, getUserAccount } from "@/utils";
import {
  useCreatePost,
  useGumContext,
  useSessionWallet,
  useUploaderContext,
} from "@gumhq/react-sdk";
import { useProfile } from "@gumhq/react-sdk";
import { GPLCORE_PROGRAMS } from "@gumhq/sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Post from "@/components/Post";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export type Post = {
  content: {
    content: string;
    format: string;
  };
  type: string;
  authorship: {
    signature: string;
    publicKey: string;
  };
  metadataUri: string;
  transactionUrl: string;
  platform: string;
};

const CreatePost = () => {
  const [post, setPost] = useState("");
  const { sdk } = useGumContext();
  const wallet = useWallet();
  const session = useSessionWallet();
  const {
    publicKey,
    sessionToken,
    createSession,
    ownerPublicKey,
    sendTransaction,
  } = session;
  const { handleUpload, uploading, error } = useUploaderContext();
  const { create, createPostError } = useCreatePost(sdk);
  const [user, setUser] = useState<PublicKey | undefined>(undefined);
  const [profile, setProfile] = useState<PublicKey | undefined>(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const setUp = async () => {
      if (wallet.publicKey) {
        const userAccount = await getUserAccount(sdk, wallet.publicKey);
        if (userAccount) {
          setUser(userAccount);
          const profileAccount = await getProfileAccount(sdk, userAccount);
          const pro = await getProfileAccount(sdk, profileAccount as PublicKey);
          console.log(pro);
          if (profileAccount) {
            setProfile(profileAccount);
          } else {
            router.push("/createProfile");
          }
        } else {
          router.push("/createProfile");
        }
      }
    };
    setUp();
  }, [router, sdk, wallet.publicKey]);

  // const { profile: profileData } = useProfile(sdk, new PublicKey(profile));
  // console.log(profileData);

  const updateSession = async () => {
    if (!sessionToken) {
      const targetProgramId = GPLCORE_PROGRAMS["devnet"];
      const topUp = true; // this will transfer 0.01 SOL to the session wallet
      const sessionDuration = 60;
      return await createSession(targetProgramId, topUp, sessionDuration);
    }
    return session;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const session = await updateSession();

    if (!session) {
      console.log("missing session");
      return;
    }
    if (
      !session.sessionToken ||
      !session.publicKey ||
      !session.signMessage ||
      !session.sendTransaction ||
      !profile ||
      !user
    ) {
      console.log(` profile: ${profile} user: ${user}`);
      console.log("missing session or profile or user");
      return;
    }

    // sign the post with the session wallet
    const postArray = new TextEncoder().encode(post);
    const signature = await session.signMessage(postArray);
    const signatureString = JSON.stringify(signature.toString());

    // create the post metadata
    const metadata = {
      content: {
        content: post,
        time: new Date().getTime(),
        image: image,
        format: "markdown",
        publicKey: wallet.publicKey,
      },
      type: "text",
      authorship: {
        publicKey: session.publicKey.toBase58(),
        signature: signatureString,
      },
      metadataUri: "",
      transactionUrl: "",
      platform: "ambitionHub",
    };

    // upload the post to arweave
    const uploader = await handleUpload(metadata, session);
    if (!uploader) {
      console.log("error uploading post");
      return;
    }

    // create the post
    const txRes = await create(
      uploader.url,
      profile,
      user,
      session.publicKey,
      new PublicKey(session.sessionToken),
      session.sendTransaction
    );
    if (!txRes) {
      console.log("error creating post");
      return;
    }
    metadata.metadataUri = uploader.url;
    metadata.transactionUrl = `https://solana.fm/tx/${txRes}?cluster=devnet-solana`;

    setPosts((prevState) => [metadata, ...prevState]);

    setPost("");
  };

  return (
    <>
      <Header />
      <main className="w-full">
        <div className="w-3/4 m-auto mt-4">
          <form onSubmit={handleSubmit}>
            <div>
              <textarea
                id="content"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder="Content..."
                className="w-full px-6 py-1 border-[1px] border-gray-400 rounded-md mt-4 h-32"
              />
            </div>
            <div>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL..."
                className="w-full px-6 py-1 border-[1px] border-gray-400 rounded-md mt-4"
              />
            </div>

            <button
              type="submit"
              className="button bg-[#3F75DC] text-white mt-5"
            >
              Submit
            </button>
          </form>
        </div>
        <Post posts={posts} />
      </main>
    </>
  );
};

export default CreatePost;
