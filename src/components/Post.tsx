import styles from "@/styles/Home.module.css";
import { Card, User, Text, Image, Button } from "@nextui-org/react";
import { formatTime } from "@/utils/formatTime";
import Link from "next/link";
import CandyPayHelper from "@/lib/candyPay";

const Post = ({ posts }: any) => {
  console.log(posts);
  return (
    <div className="w-full m-auto px-20 flex items-center flex-wrap justify-center">
      {posts.map((post: any, index: number) => (
        <div
          className="border-[1px] border-gray-400 p-6 rounded-md mb-8 w-1/3 mr-5"
          key={index}
        >
          <Text
            css={{
              padding: "0.25rem 0.75rem",
              fontSize: "12px",
            }}
          >
            {formatTime(post.metadata.content.time)}
          </Text>
          <Link href={`/post/${post.address}`} className="cursor-pointer">
            <p className="truncate text-xl text-black font-medium mb-2">
              {post.metadata.content.title}
            </p>

            <Image
              src={post.metadata.content.image as string}
              alt="Default Image"
              objectFit="cover"
            />
            <Text
              css={{
                padding: "0 0.75rem",
                fontSize: "20px",
                margin: "8px 0",
                color: "#F9153E",
                fontWeight: 700,
              }}
            >
              {`Với mục tiêu: ${post.metadata.content.target} $ trong vòng ${post.metadata.content.duration} ngày`}
            </Text>
          </Link>
          <Button
            auto
            rounded
            bordered={true}
            onClick={() => {
              CandyPayHelper.tran(post.metadata.address).then((data) => {
                console.log(data.payment_url);
                window.location.href = data.payment_url;
              });
            }}
          >
            Donate
          </Button>
          {/* <div className={styles.logos}>
            <a
              href={post.metadata.metadataUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="https://seeklogo.com/images/A/arweave-ar-logo-7458401CAE-seeklogo.com.png"
                alt="Arweave Metadata"
                width={20}
                height={20}
              />
            </a>
            <a
              href={post.metadata.transactionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png"
                alt="Solana Tx"
                width={20}
                height={20}
              />
            </a>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Post;
