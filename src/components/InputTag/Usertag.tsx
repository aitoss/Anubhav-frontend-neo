import { X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTags } from "../../hooks/useTags";

const InputTag = ({ setTags, tags }: any) => {
  const [tag, setTag] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Use React Query for tags
  const { data: tagSuggestions = [] } = useTags();

  const handleChange = useCallback((e: any) => {
    setTag(e.target.value);
    setError("");
  }, []);

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      e.preventDefault();
      addTag();
    }
  }, [tag]);

  const addTag = useCallback(() => {
    if (tags.includes(tag.trim())) {
      setError("This tag is already added!");
    } else {
      setTags([...tags, tag.trim()]);
      setTag("");
      setError("");
    }
  }, [tag, tags, setTags]);

  const handleTagDelete = useCallback((index: any) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  }, [tags, setTags]);

  // Memoize tag suggestions
  const tagSuggestionsList = useMemo(() => (
    <datalist id="tagSuggestions">
      {tagSuggestions.map((suggestion: any, index: number) => {
        // Based on console logs, suggestions have _id and count properties
        const suggestionValue = suggestion._id || String(suggestion);

        return <option key={index} value={suggestionValue} />;
      })}
    </datalist>
  ), [tagSuggestions]);

  // Memoize tag items
  const tagItems = useMemo(() => (
    tags.map((tagItem: any, index: number) => {
      // Handle case where tagItem might be an object instead of a string
      const displayTag = typeof tagItem === 'string'
        ? tagItem
        : (tagItem?.name || tagItem?.tag || tagItem?.title || String(tagItem));

      return (
        <div
          key={index}
          className="flex size-fit items-center justify-center rounded-full border bg-[#f0f0f0] px-1.5 transition-all hover:bg-[#e9e9e9]"
        >
          <span className="text-center text-sm font-light text-[#212121]">
            {displayTag}
          </span>
          <span
            onClick={() => handleTagDelete(index)}
            className="cursor-pointer text-2xl"
          >
            <X className="h-4 w-4 items-center text-[#919191]" />
          </span>
        </div>
      );
    })
  ), [tags, handleTagDelete]);

  return (
    <div>
      <div className="relative flex flex-col">
        <div className="flex w-full flex-wrap gap-2 overflow-y-auto md:w-full">
          <h4 className="text-[#212121]">Tags</h4>
        </div>
        <div className="text-md flex w-full text-sm flex-col gap-2 rounded-lg border-[1px] border-[#78788033] bg-white py-1 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] p-2 md:w-full">
          {tags.length !== 0 && (
            <div className="-mb-2 flex flex-wrap gap-2 p-2 pb-0">
              {tagItems}
            </div>
          )}
          <input
            type="text"
            name="tag"
            list="tagSuggestions"
            className="text-md w-full text-sm rounded-lg border-0 bg-white text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:border-0 focus:outline-none focus:ring-0 focus:placeholder:text-[#3c3c4350] p-2 md:w-full"
            placeholder="Tags relevant to your field"
            value={tag}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {tagSuggestionsList}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputTag;
