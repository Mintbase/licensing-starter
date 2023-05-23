import PubNub from "pubnub";

const pubnub = new PubNub({
  userId: "verification-sdk-iframe",
  subscribeKey: "sub-c-b36746ec-a4bf-11ec-8a23-de1bbb7835db",
  publishKey: "pub-c-db6abb24-ed6e-41a2-b2f2-2322e2dcf786",
  logVerbosity: true,
  ssl: true,
  presenceTimeout: 130,
});

export default pubnub;
