import { CandyPay } from "@candypay/checkout-sdk";
import type { NextApiHandler } from "next";

export default class CandyPayHelper {
  static tran = async (projectid: string) => {
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

    const response = await sdk.session.create({
      success_url: `http://localhost:3000/success/1`,
      cancel_url: `http://localhost:3000/cancel/2`,
      tokens: [],
      items: [
        {
          name: "Solana Shades",
          // price in USD
          price: 0.1,
          image: "https://imgur.com/M0l5SDh.png",
          quantity: 1,
        },
      ],
      metadata: {
        projectid: projectid,
      },
    });
    return response;
  };
}
