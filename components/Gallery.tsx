/* eslint-disable @next/next/no-img-element */
import Masonry from "react-masonry-css";
import { useListed } from "../hooks/useListed";
import Link from "next/link";
import { Loader } from "./Loader";
import { LicenseToken } from "@/hooks/useToken";

type GalleryProps = {
  images: LicenseToken[]
  loading: boolean
  error: unknown
}

export const Gallery = ({ images, loading, error }: GalleryProps) => {

  if (error) return <div>{error.toString()}</div>
  if (loading) return <Loader />

  const breakpointColumnsObj = {
    default: 4,
    1000: 3,
    700: 2,
    500: 1
  }

  return (
    <div className="gallery">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map(function (data: any) {
          return (
            <div key={data?.tokenId} className="photo-tile">
              <Link href={`/${data?.tokenId}`}>
                <div className="pop-info">
                  <h2>{data.photographer}</h2>
                </div>
                <img src={data.media} alt="" className="image" />
              </Link>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};
