import { useGumContext, useExploreFeed } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import { PostMetadata } from "@gumhq/ui-components";
import { useEffect, useState } from "react";
import { Post } from "./gum/Post";

export function SocialFeed() {
  const { sdk } = useGumContext();
  const [feeds, setFeeds] = useState<any>(null);

  const { exploreFeedData } = useExploreFeed(sdk, "Personal");

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
      {feeds &&
        // <Feed posts={feed} skip={0} show={feed ? feed.length : 0} gap={0.5} />
        feeds.map((feed: any, index: number) => (
          <div key={index} className="mb-16">
            <Post data={feed.post} profileData={feed.profile} />
          </div>
        ))}
    </div>
  );
}
