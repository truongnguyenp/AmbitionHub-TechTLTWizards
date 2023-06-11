import { useGumContext, useExploreFeed } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import { PostMetadata } from "@gumhq/ui-components";
import { useEffect, useState } from "react";
import { Post } from "./gum/Post";
import SkeletonWrapper, { Skeleton } from "./Skeleton";

export function SocialFeed() {
  const { sdk } = useGumContext();
  const [feeds, setFeeds] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { exploreFeedData, exploreFeedLoading } = useExploreFeed(
    sdk,
    "Personal"
  );

  useEffect(() => {
    const getData = async () => {
      if (exploreFeedData) {
        await testGetData(exploreFeedData);
      }
    };
    getData();
  }, [exploreFeedData]);

  const testGetData = async (data: any) => {
    setLoading(true);
    const filteredData = data.filter(
      (post: any) =>
        post.metadata.platform === "AmbitionHub" &&
        post.metadata.content.publicKey
    );
    const promises = filteredData.map(async (post: any) => {
      const profileMeta = await sdk.profileMetadata.getProfileMetadataByUser(
        new PublicKey(post.metadata.content.publicKey)
      );
      const profileData = profileMeta[0].metadata;
      const { type, content } = post.metadata;
      return {
        post: {
          type,
          content,
        } as PostMetadata,
        profile: profileData,
        address: post.address,
      };
    });

    const feedsData = await Promise.all(promises);
    setFeeds(feedsData);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-wrap justify-center items-stretch">
      {exploreFeedLoading || loading ? (
        <SkeletonWrapper>
          <div className="flex items-center justify-around w-full">
            <div className="w-1/2 mr-32">
              <div className="flex items-center mb-2">
                <Skeleton className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <Skeleton className="h-3 w-32 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="w-full h-52" />
              <Skeleton className="w-full h-52 mt-10" />
            </div>
            <div className="w-1/2 ">
              <div className="flex items-center mb-2">
                <Skeleton className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <Skeleton className="h-3 w-32 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="w-full h-52" />
              <Skeleton className="w-full h-52 mt-10" />
            </div>
          </div>
        </SkeletonWrapper>
      ) : (
        feeds &&
        // <Feed posts={feed} skip={0} show={feed ? feed.length : 0} gap={0.5} />
        feeds.map((feed: any, index: number) => (
          <div key={index} className="mb-16 w-[calc(33%-20px)] p-5">
            <Post
              data={feed.post}
              profileData={feed.profile}
              address={feed.address}
            />
          </div>
        ))
      )}
    </div>
  );
}
