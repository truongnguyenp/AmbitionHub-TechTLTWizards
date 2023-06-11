import { useGumContext } from "@gumhq/react-sdk";
import { PublicKey } from "@solana/web3.js";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
// import Post from "@/components/Post";
import { useRouter } from "next/router";
import { Image } from "@nextui-org/react";
import { formatDate } from "@/utils/formatTime";
import CandyPayHelper from "@/lib/candyPay";

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

function Post() {
  const [postData, setPostData] = useState<any>(null);
  const { sdk } = useGumContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        // console.log(id);
        const p: any = await sdk.post.get(new PublicKey(id as string));
        const posts = await sdk.post.getPostsByProfile(p.profile);
        for (const post of posts) {
          if (post.address === id) {
            setPostData(post);
          }
        }
        console.log(p);
      }
    };

    getPost();
  }, [id]);
  console.log(postData);
  return (
    <>
      <Header />
      {postData && (
        <div className="px-20 mt-10 flex flex-col items-center mb-20">
          <div className="w-full">
            <h2 className="text-start w-full">
              {postData.metadata.content.title}
            </h2>
          </div>
          <div className="w-full flex items-start">
            <Image
              src={postData.metadata.content.image}
              alt="Image"
              objectFit="cover"
              className="w-1/2"
            />
            <div className="w-1/2 pl-5">
              <p className="text-[#F9153E] font-bold text-xl mb-5">{`Start time : ${formatDate(
                postData.metadata.content.time
              )}`}</p>
              <p className="text-[#F9153E] font-bold text-xl mb-5">{`Duration : ${postData.metadata.content.duration} day`}</p>
              <p className="text-[#F9153E] font-bold text-xl">{`Target : ${postData.metadata.content.target} $`}</p>
              <div className="mt-20 w-full">
                <button
                  className="w-full border-[2px] border-[#0072f5] py-3 rounded-xl text-[#0072f5] font-semibold
                    hover:bg-[#0072f5] hover:text-white transition-all duration-500 text-xl
                  "
                  onClick={() => {
                    CandyPayHelper.tran(postData.address).then((data) => {
                      console.log(data.payment_url);
                      window.location.href = data.payment_url;
                    });
                  }}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
          <p className="w-3/4 mt-6 leading-8 text-xl">
            {postData.metadata.content.content}
          </p>
        </div>
      )}
    </>
  );
}

export default Post;
