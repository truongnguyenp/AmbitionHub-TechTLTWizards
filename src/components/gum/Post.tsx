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
import { formatTime } from "@/utils/formatTime";
import { useEffect, useState } from "react";

export interface PostMetadata {
  type: string;
  content: {
    content: string;
    format: string;
    image: string;
    publicKey: string;
    time: number;
    title: string;
    duration: number;
    target: number;
  };
  address: string;
  reply?: () => any;
}

function Post({
  data,
  profileData,
  address,
}: {
  data: PostMetadata;
  profileData: ProfileMetadata;
  address: string;
}) {
  const likeData = {
    liked: false,
    like: async () => alert("Like"),
    unlike: async () => alert("Unlike"),
  };
  const [money, setMoney] = useState("");

  const renderTagPost = (time: number, duration: number) => {
    const isOpening: number =
      time + duration * 24 * 60 * 60 * 1000 - new Date().getTime();

    return (
      <span className="inline-block px-6 py-2 rounded-lg font-semibold text-white bg-[#ED1651]">
        {isOpening > 0 ? "Opening" : "Closed"}
      </span>
    );
  };

  // console.log(data, profileData);

  return (
    <>
      {data ? (
        <Card css={{ width: "100%", position: "relative", padding: "10px" }}>
          <Card.Body>
            {profileData ? (
              <Link href={`/profile/${data.content.publicKey}`}>
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
            ) : null}
            <Text
              css={{
                padding: "0.25rem 0.75rem",
                fontSize: "12px",
              }}
            >
              {formatTime(data.content.time)}
            </Text>
            <Link href={`post/${address}`} className="cursor-pointer">
              <p className="truncate text-xl text-black font-medium mb-2">
                {data.content.title}
              </p>

              <Image
                src={data.content.image as string}
                alt="Default Image"
                objectFit="cover"
              />
              <Text
                css={{
                  padding: "0 0.75rem",
                  fontSize: "20px",
                  color: "#F9153E",
                  fontWeight: 700,
                }}
              >
                {`Target: ${data.content.target} $`}
              </Text>
              <Text
                css={{
                  padding: "0 0.75rem",
                  fontSize: "20px",
                  color: "#F9153E",
                  fontWeight: 700,
                  margin: "10px 0",
                }}
              >
                {`Duration: ${data.content.duration} day`}
              </Text>
            </Link>

            <input
              type="number"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              placeholder="Money"
              className="px-7 py-2 border-[1px] border-gray-500 rounded-lg w-full mb-4"
            />
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
          <div className="absolute top-4 right-2">
            {renderTagPost(data.content.time, data.content.duration)}
          </div>
        </Card>
      ) : (
        <Loading size="md" />
      )}
    </>
  );
}

export { Post };
