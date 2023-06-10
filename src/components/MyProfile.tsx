import { SDK, useGumContext, useProfile } from "@gumhq/react-sdk";
// import { Profile } from "@gumhq/ui-components";
import { PublicKey } from "@solana/web3.js";
import { Profile, ProfileMetadata } from "./gum/Profile";
import { Post } from "./gum/Post";
import { PostMetadata } from "./gum/Post";
import CreatePost from "./CreatePost";

export function MyProfile() {
  const { sdk } = useGumContext();
  const { profile } = useProfile(
    sdk,
    new PublicKey("HbaeYzrgBnM8gPshvNgd2xH7mV5fpBnAo3Gqwr1xfjD2")
  );

  const profileData = {
    ...profile?.metadata,
    following: profile?.following || 0,
    followers: profile?.followers || 0,
    connect: {
      following: false,
      follow: () => {
        alert("follow");
      },
      unfollow: () => {
        alert("unfollow");
      },
    },
  };

  // const profile: ProfileMetadata = {...}
  const post: PostMetadata = {
    type: "text",
    content: {
      format: "markdown",
      content: "Hello World",
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* <CreatePost /> */}
      <Profile data={profileData} />
    </div>
  );
}
