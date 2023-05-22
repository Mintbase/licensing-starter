import { useAccountId } from "./useAccountId";
import { useTwitterUserId } from "./useTwitterUserId";

export const useFetchNearAccount = () => {
  const fetchTwitterUserId = useTwitterUserId();
  const createOrFetchAccountId = useAccountId();

  const fetchNearAccount = async (
    accountName: string
  ): Promise<string | undefined> => {
    const username = accountName;
    const userId = await fetchTwitterUserId(username);
    if (userId) {
      const nearAccountId = await createOrFetchAccountId("twitter", userId);
      return nearAccountId;
    }
    return undefined;
  };

  return fetchNearAccount;
};
