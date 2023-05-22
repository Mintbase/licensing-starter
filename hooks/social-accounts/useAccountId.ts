export const useAccountId = () => {
  const createOrFetchAccountId = async (
    platform: string,
    uid: string
  ): Promise<string | undefined> => {
    try {
      const req = await fetch(
        `https://connect.mintbase.xyz/social-account/${platform}/${uid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const res = await req.json();
      const data = res?.accountId;
      return data as string;
    } catch (error) {
      // Handle error
    }
  };
  return createOrFetchAccountId;
};
