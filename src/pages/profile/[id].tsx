import { useGumContext } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import Header from "@/components/Header";
import { Profile as ProfileFC } from "@/components/gum/Profile";
import { useEffect, useState } from "react";
import Post from "@/components/Post";
import { useRouter } from "next/router";

export type PostType = {
  content: {
    content: string;
    image: string;
    time: number;
    format: string;
    publicKey: string;
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
  const [profileData, setprofileData] = useState<any>(null);
  const { sdk } = useGumContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getProfile = async () => {
      if (id) {
        const profile = await sdk.profileMetadata.getProfileMetadataByUser(
          new PublicKey(id as string)
        );
        //   console.log(profile);
        const profileCustom = {
          ...(profile[0]?.metadata as any),
        };

        setprofileData(profileCustom);
      }
    };

    getProfile();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await sdk.post.getPostsByUser(new PublicKey(id as string));
        if (data) {
          let postsData = [];
          for (const post of data as any) {
            if (post.metadata.platform === "AmbitionHub") {
              postsData.push(post);
            }
          }
          setPosts(postsData as PostType[]);
        }
      }
    };

    getData();
  }, [id]);
  return (
    <>
      <Header />
      {profileData && (
        <div className="">
          {/* <h1 className="text-center">Profile</h1> */}
          <div className="flex justify-center mt-4">
            <ProfileFC data={profileData} />
          </div>

          <div>
            <div className="text-center mt-5">
              <h4 className="text-black font-semibold text-3xl mb-5">{`Post's ${profileData.name}`}</h4>
            </div>
            <div className="flex flex-col items-center">
              {posts.length > 0 ? <Post posts={posts} /> : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
