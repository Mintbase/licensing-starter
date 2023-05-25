import { PUBNUB_REQUEST_CHANNEL_BASE } from "@/integrations/social-accounts/constants";
import { fetchSeedPhrase } from "@/integrations/social-accounts/mintbase";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import pubnub from "utils/pubnub";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { accountId, uid, platformId, sessionId } = req.body;

    try {
      const { seedphrase, error } = await fetchSeedPhrase({ platformId, uid });

      // TODO: encrypt seedphrase

      // publish the seedphrase
      pubnub.publish(
        {
          message: {
            seedphrase: seedphrase,
            error: error,
          },
          channel: `${PUBNUB_REQUEST_CHANNEL_BASE}${accountId}${sessionId}`,
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
