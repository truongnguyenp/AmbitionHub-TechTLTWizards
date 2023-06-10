import React, { useEffect } from "react";
import { useGumContext } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import { Spacer } from "@nextui-org/react";
import { ProfileMetadata } from "./Profile";
import { Post, PostMetadata } from "./Post";
import { getAllPost, getProfileAccount } from "@/utils";

export interface FeedMetadata {
  posts: {
    post: PostMetadata;
    profile: ProfileMetadata;
  }[];
  skip: number;
  show: number;
  gap: number;
}

function Feed({ posts, skip, show, gap }: FeedMetadata) {
  const { sdk } = useGumContext();

  useEffect(() => {
    const getData = async () => {
      const data = await getProfileAccount(
        sdk,
        new PublicKey("6FKC12h85MmiZ1WtYamRJE3SpcrgUkSr8maWsLAoKwjQ")
      );

      // console.log(data);
    };

    getData();
  }, []);
  console.log(posts);
  return (
    <>
      <div className="">
        {posts.slice(skip, skip + show).map((p, index) => (
          <div key={index} className="w-full">
            <Post data={p.post} profileData={p.profile} />
            <Spacer y={gap} />
          </div>
        ))}
      </div>
    </>
  );
}

export { Feed };
