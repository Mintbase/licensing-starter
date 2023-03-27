import { useWallet } from "@mintbase-js/react"
import Link from "next/link"
import { AssetRows } from "./AssetRows"
import { useTrending } from "@/hooks/useTrending"
import { useAssetsByMinter } from "@/hooks/useAssetsByMinter"


export const CreateManage = () => {
  const { activeAccountId } = useWallet();
  const { data, loading, error } = useAssetsByMinter(activeAccountId);
  return (
    <div className="create manage">
      <h1>Manage Assets</h1>
      <p>Manage which asset licenses are available for purchase</p>
      <AssetRows images={data} showCta={true} />
      <br />
      <h3>Did you know?</h3>
      <p>In the world of basketball photography, it is estimated that professional photographers take around 3,000 to 5,000 photos during a single NBA game. Out of these thousands of photos, only a select few - often less than 1% - will be deemed exceptional and used for publications, capturing the essence of the game in the most captivating way</p>
    </div>
  )
}