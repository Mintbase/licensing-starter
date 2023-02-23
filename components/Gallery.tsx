/* eslint-disable @next/next/no-img-element */
import Masonry from "react-masonry-css";
import { useListed } from "../hooks/useListed";
import Link from "next/link";
import { Loader } from "./Loader";

export const Gallery = () => {
  const { data, loading, error } = useListed();

  console.log(data)

  if (error) return <div>{error.toString()}</div>
  if (loading) return <Loader />

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
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
        {data.map(function (data: any) {
          return (
            <div key={data?.token_id}>
              <Link href={`/${data?.token_id}`}>
                <img src={data.media} alt="" className="image" />
              </Link>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};
