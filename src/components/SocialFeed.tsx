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
    console.log(filteredData);
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
    <div className="w-full flex flex-wrap justify-between items-stretch">
      {exploreFeedLoading || loading ? (
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
          <div key={index} className="mb-16 w-[calc(50%-30px)] p-5">
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
