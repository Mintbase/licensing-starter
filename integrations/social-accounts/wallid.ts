import PubNub from "pubnub";
import {
  PUBNUB_WALLID_PUBLISH_KEY,
  PUBNUB_WALLID_SUBSCRIBE_KEY,
} from "./constants";

export const pubnub = new PubNub({
  userId: "verification-sdk-iframe",
  subscribeKey: PUBNUB_WALLID_SUBSCRIBE_KEY!,
  publishKey: PUBNUB_WALLID_PUBLISH_KEY!,
  ssl: true,
  presenceTimeout: 130,
});


export default pubnub;
