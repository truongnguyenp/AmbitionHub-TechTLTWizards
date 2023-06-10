import styles from "@/styles/Home.module.css";
import Image from "next/image";

const Post = ({ posts }: any) => {
  console.log(posts);
  return (
    <div className="w-[700px] m-auto">
      {posts.map((post: any, index: number) => (
        <div className={styles.post} key={index}>
          <div>
            <div className="mb-4">
              <div className={styles.postText}>
                {post.metadata.content.content}
              </div>
            </div>
            <div className="flex justify-center">
              {post.metadata.content.image ? (
                <Image
                  className={styles.logo}
                  src={post.metadata.content.image}
                  alt="Image "
                  width={600}
                  height={400}
                />
              ) : null}
            </div>
          </div>
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
