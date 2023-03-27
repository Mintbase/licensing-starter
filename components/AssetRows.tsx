/* eslint-disable @next/next/no-img-element */
import { useNearActions } from "@/hooks/useNearActions"
import { LicenseToken } from "@/hooks/useToken"
import Link from "next/link"

type AssetRows = {
  images: LicenseToken[]
  showCta: boolean
}

export const AssetRows = ({ images, showCta }: AssetRows) => {
  const { burnToken, delistToken } = useNearActions();
  return (
    <div className="asset-rows">
       <div className="row headings">
        <div className="col img">
          Image
        </div>
        <div className="col photog">
          Photographer
        </div>
        <div className="col views">
          Views
        </div>
        {showCta ?
          <div className="col actions"> </div> : null
        }
      </div>
      {(images && images.length)
        ? images.map((data: LicenseToken) =>
            (
              <div className="row" key={data?.tokenId}>
                <div className="col img">
                  <Link href={`/${data?.tokenId}`}><img src={data.media} alt={data.description} className="image" /></Link>
                </div>
                <div className="col photog">
                  {data.photographer}
                </div>
                <div className="col views">
                  {(Math.floor(Math.random() * (100_000 - 50 + 1)) + 50).toLocaleString()}
                </div>
                {showCta ?
                  <div className="col actions">
                    {/* <button onClick={() => burnToken(data.tokenId)} className="list">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </button> */}
                    <button onClick={() => delistToken(data.tokenId)} className="delist">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button onClick={() => burnToken(data.tokenId)} className="delete">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                  : null
                }
              </div>
            )
          )
        : <span>No assets to display</span>
      }
    </div>
  )
}