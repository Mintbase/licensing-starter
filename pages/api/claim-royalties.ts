import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import pubnub from "utils/pubnub";

const REQUEST_SEED_CHANNEL = "request_seed_";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { accountId, uid, platformId, sessionId } = req.body;

    try {
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

      const hasSeedphrase = result?.seedPhrase;
      const hasError = result?.error;

      // TODO: encrypt seedphrase

      // publish the seedphrase
      pubnub.publish(
        {
          message: {
            seedphrase: hasSeedphrase ? result?.seedPhrase : null,
            error: hasError ? result?.error : "",
          },
          channel: `${REQUEST_SEED_CHANNEL}${accountId}${sessionId}`,
        },
        ({ statusCode, operation, error }) => {
          console.log(statusCode, operation, error);
        }
      );

      return NextResponse.json(
        { status: "ok" },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    } catch (error) {
      return NextResponse.json(
        { status: "ok" },
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
  } else {
    return NextResponse.json(
      { status: "ok" },
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
