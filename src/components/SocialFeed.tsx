import { useGumContext, useExploreFeed } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import { PostMetadata } from "@gumhq/ui-components";
import { useEffect, useState } from "react";
import { Post } from "./gum/Post";
import SkeletonWrapper, { Skeleton } from "./Skeleton";

export function SocialFeed() {
  const { sdk } = useGumContext();
  const [feeds, setFeeds] = useState<any>(null);

  const { exploreFeedData, exploreFeedLoading } = useExploreFeed(
    sdk,
    "Personal"
  );

  useEffect(() => {
    if (exploreFeedData) {
      testGetData(exploreFeedData);
    }
  }, [exploreFeedData]);

  const testGetData = async (data: any) => {
    let feedsData = [];
    for (const post of data) {
      if (post.metadata.platform === "ambitionHub") {
        if (post.metadata.content.publicKey) {
          const profileMeta =
            await sdk.profileMetadata.getProfileMetadataByUser(
              new PublicKey(post.metadata.content.publicKey)
            );
          const profileData = profileMeta[0].metadata;
          const metadata = post.metadata;
          const postCustom = {
            post: {
              type: metadata.type,
              content: metadata.content,
            } as PostMetadata,
            profile: profileData,
          };
          feedsData.push(postCustom);
        }
      }
    }
    setFeeds(feedsData);
  };

  return (
    <div>
      {exploreFeedLoading ? (
        <SkeletonWrapper>
          <div className="w-[700px]">
            <div className="flex items-center mb-2">
              <Skeleton className="w-8 h-8 rounded-full mr-2" />
              <div>
                <Skeleton className="h-2 w-20 mb-2" />
                <Skeleton className="h-2 w-20" />
              </div>
            </div>
            <Skeleton className="w-[90%] h-40" />
            <Skeleton className="w-[90%] h-40 mt-10" />
          </div>
          <div className="w-[700px] mt-10">
            <div className="flex items-center mb-2">
              <Skeleton className="w-8 h-8 rounded-full mr-2" />
              <div>
                <Skeleton className="h-2 w-20 mb-2" />
                <Skeleton className="h-2 w-20" />
              </div>
            </div>
            <Skeleton className="w-[90%] h-40" />
            <Skeleton className="w-[90%] h-40 mt-10" />
          </div>
        </SkeletonWrapper>
      ) : (
        feeds &&
        // <Feed posts={feed} skip={0} show={feed ? feed.length : 0} gap={0.5} />
        feeds.map((feed: any, index: number) => (
          <div key={index} className="mb-16">
            <Post data={feed.post} profileData={feed.profile} />
          </div>
        ))
      )}
    </div>
  );
}
