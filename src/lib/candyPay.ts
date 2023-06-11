import { CandyPay } from "@candypay/checkout-sdk";
import type { NextApiHandler } from "next";

import { sign } from "jsonwebtoken";

const jwtid = "jasdnasndknajbwknjaadad";

export default class CandyPayHelper {
  static tran = async (projectid: string, profileid: string, projectname: string, imageurl: string, price: number) => {
    let sdk = new CandyPay({
      api_keys: {
        private_api_key: "cp_private_VppuxpyE_kJeuib8dYM9zQuEGz7n9aU7b",
        public_api_key: "cp_public_SkywaZig_QFGRbagFwkm24SAToC2dudTt",
      },
      network: "devnet", // use 'mainnet' for prod and 'devnet' for dev environment
      config: {
        collect_shipping_address: false,
      },
    });
    var tokensuccess = sign({
      projectid: projectid,
      profileid: profileid,
      type: "success"
    } as object, jwtid);
    var tokencancel = sign({
      projectid: projectid,
      profileid: profileid,
      type: "cancel"
    } as object, jwtid);
    const response = await sdk.session.create({
      success_url: `http://localhost:3000/success/` + 
      tokensuccess,
      cancel_url: `http://localhost:3000/cancel/` + tokencancel
      ,
      tokens: [],
      items: [
        {
          name: projectname,
          // price in USD
          price: price,
          image: imageurl,
          quantity: 1,
        },
      ]
    });
    return response;
  };
}
