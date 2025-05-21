

import Tag from '../../InputTag/Tag'

const Tags = ({
  data
}: any) => {
  return (
    <>
      <div className="tags flex flex-wrap gap-2 items-center py-1">
        {data?.map((tag: any) => (
          <Tag name={tag} />
        ))}
      </div>
    </>
  );
};

export default Tags;
