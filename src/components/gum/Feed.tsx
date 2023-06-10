import React from "react";
import { Spacer } from "@nextui-org/react";
import { ProfileMetadata } from "./Profile";
import { Post, PostMetadata } from "./Post";

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
