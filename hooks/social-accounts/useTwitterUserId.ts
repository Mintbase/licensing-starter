export const useTwitterUserId = () => {
  const fetchTwitterUserId = async (
    username: string
  ): Promise<string | undefined> => {
    try {
      const req = await fetch(
        "https://demo.dca.wallid.io/api/v1/social-profile/twitter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username }),
        }
      );

      const res = await req.json();
      const userId = res?.data?.data?.user?.id_str;
      return userId as string;
    } catch (error) {
      // Handle error
    }
  };
  return fetchTwitterUserId;
};
