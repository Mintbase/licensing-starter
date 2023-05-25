export const fetchSeedPhrase = async ({
  platformId,
  uid,
}: {
  platformId: string;
  uid: string;
}) => {
  try {
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

    return {
      seedphrase: hasSeedphrase ? result?.seedPhrase : null,
      error: hasError ? result?.error : "",
    };
  } catch (error) {
    return { error: error, seedphrase: null };
  }
};
