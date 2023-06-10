import React from "react";
import { ProfileMetadata } from "./Profile";
import {
  Card,
  User,
  Text,
  Spacer,
  Loading,
  Image,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import CandyPayHelper from "@/lib/candyPay";

export interface PostMetadata {
  type: string;
  content: {
    content: string;
    format: string;
    image: string;
  };
  address: string;
  reply?: () => any;
}

function Post({
  data,
  profileData,
}: {
  data: PostMetadata;
  profileData: ProfileMetadata;
}) {
  const likeData = {
    liked: false,
    like: async () => alert("Like"),
    unlike: async () => alert("Unlike"),
  };

  return (
    <>
      {data && profileData ? (
        <Card css={{ mw: "700px" }}>
          <Card.Body>
            <Link href={"/profile"}>
              <User
                src={profileData.avatar}
                name={profileData.name}
                size="md"
                bordered
                color="secondary"
              >
                <User.Link>@{profileData.username}</User.Link>
              </User>
            </Link>
            <Spacer y={0.5} />
            <Text
              css={{
                padding: "0 0.75rem",
              }}
            >
              {data.content.content}
            </Text>
            <Spacer y={1} />
            <Image
              //   width={'auto'}
              //   height={180}
              src={data.content.image as string}
              alt="Default Image"
              objectFit="cover"
            />
            <Spacer y={1} />
            {/* <div className="flex items-center gap-3 mb-4">
              <LikeButton data={likeData} />
            </div> */}
            <Button
              auto
              rounded
              bordered={true}
              onClick={() => {
                CandyPayHelper.tran(data.address).then((data) => {
                  console.log(data.payment_url);
                  window.location.href = data.payment_url;
                });
              }}
            >
              Donate
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Loading size="md" />
      )}
    </>
  );
}

export { Post };
