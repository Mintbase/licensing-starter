import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import pubnub from "utils/pubnub";

const REQUEST_SEED_CHANNEL = "request_seed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { accountId, uid, platformId } = req.body;

    // request the seedphrase
    const request = await fetch(
      `https://connect.mintbase.xyz/social-account/${platformId}/${uid}/seed-phrase`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "0.8o4wxz5fkd", // TODO: remove hardcoded token
        },
      }
    );
    const result = await request.json();
    const { seedPhrase } = result;

    // publish the seedphrase
    pubnub.publish(
      {
        message: { seedphrase: seedPhrase },
        channel: `${REQUEST_SEED_CHANNEL}${accountId}`,
      },
      ({ statusCode, operation, error }) => {
        console.log(statusCode, operation, error);
      }
    );

    return NextResponse.json(
      { id: true },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } else {
    return NextResponse.json(
      { id: false },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
