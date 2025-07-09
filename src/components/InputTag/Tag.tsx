import Link from "next/link";

const Tag = ({
  name
}: any) => {
  return (
    <>
      <Link href={`/search?query=${name}`} >
        <div className="flex gap-1 bg-[#f0f0f0] border px-2 items-center rounded-full hover:bg-[#e9e9e9] transition-all justify-center text-[#212121] font-light text-sm text-center text-base cursor-pointer">
          {name}
        </div>
      </Link>
    </>
  );
};

export default Tag;
