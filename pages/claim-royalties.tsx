import dynamic from "next/dynamic";

const ClaimRoyalties = dynamic(() => import("@/components/ClaimRoyalties"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function ClaimRoyaltiesPage() {
  return (
    <>
      <ClaimRoyalties />
    </>
  );
}
