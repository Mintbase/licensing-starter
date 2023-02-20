import Masonry from "react-masonry-css";
import { useListed } from "@/hooks/useListed";
import Link from "next/link";

export const Gallery = () => {
  const { data, loading } = useListed();

  if (loading) return <h1>Loading...</h1>;

  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data.map(function (data: any) {
        return (
          <Link href={`/${data?.token_id}`} key={data?.token_id}>
            <img src={data.media} alt="" />
          </Link>
        );
      })}
    </Masonry>
  );
};
