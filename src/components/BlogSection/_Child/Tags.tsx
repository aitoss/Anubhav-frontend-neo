import Tag from "../../InputTag/Tag";

const Tags = ({ data }: any) => {
  return (
    <>
      <div className="tags flex flex-wrap items-center gap-2 py-1">
        {data?.map((tag: any, index: number) => <Tag key={index} name={tag} />)}
      </div>
    </>
  );
};

export default Tags;
