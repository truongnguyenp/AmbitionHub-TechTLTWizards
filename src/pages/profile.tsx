import styles from "@/styles/CreateProfile.module.css";
import { SDK, useGumContext, useProfile } from "@gumhq/react-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { getAllPost, getProfileAccount } from "@/utils";
import { PublicKey } from "@solana/web3.js";
import Header from "@/components/Header";
import { Profile as ProfileFC } from "@/components/gum/Profile";
import { useEffect, useState } from "react";
import Post from "@/components/Post";
// import { Post } from "./createPost";

export type PostType = {
  content: {
    content: string;
    image: string;
    time: number;
    format: string;
  };
  type: string;
  authorship: {
    signature: string;
    publicKey: string;
  };
  metadataUri: string;
  platform: string;
  transactionUrl: string;
};

function Profile() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { sdk } = useGumContext();
  const wallet = useWallet();

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

  useEffect(() => {
    const getData = async () => {
      if (wallet.publicKey) {
        const data = await getAllPost(sdk, wallet.publicKey);
        console.log(data);
        if (data) {
          let postsData = [];
          for (const post of data) {
            if (post.platform === "ambitionHub") {
              postsData.push(post);
            }
          }
          setPosts(postsData as PostType[]);
        }
      }
    };

    getData();
  }, []);
  return (
    <>
      <Header />
      <div className="">
        <h1 className="text-center">Profile</h1>
        {/* <form onSubmit={(event) => createUserAndProfile(event, name, bio, username, avatar)}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} className={styles.input} />
          <label htmlFor="bio" className={styles.label}>Bio</label>
          <input type="text" id="bio" value={bio} onChange={(event) => setBio(event.target.value)} className={styles.input} />
          <label htmlFor="username" className={styles.label}>Username</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} className={styles.input} />
          <label htmlFor="avatar" className={styles.label}>Avatar</label>
          <input type="text" id="avatar" value={avatar} onChange={(event) => setAvatar(event.target.value)} className={styles.input} />
          <button type="submit" className={styles.submitButton}>Create Profile</button>
        </form> */}
        <div className="flex justify-center">
          <ProfileFC data={profileData} />
        </div>

        <div>
          <div className="text-center mt-5">
            <h4 className="text-black font-semibold text-3xl">My Posts</h4>
          </div>
          <div className="flex flex-col items-center">
            {posts.length > 0 ? <Post posts={posts} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
