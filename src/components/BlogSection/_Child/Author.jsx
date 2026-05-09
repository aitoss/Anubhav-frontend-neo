import { Link } from "react-router-dom";
import { profileUrl } from "../../../utils/slug";

const MiniAvatar = ({ person }) => {
  if (person?.logoUrl) {
    return (
      <img
        src={person.logoUrl}
        alt={person.name || "Author"}
        className="h-6 w-6 rounded-full border border-[#e5e7eb] object-cover"
      />
    );
  }
  const initials = (person?.name || "?")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-[500] text-white"
      style={{
        backgroundColor: "#212121",
        border: "1px solid #0a0a0a",
        textShadow: "0 1px 1px rgba(0, 0, 0, 0.08)",
      }}
    >
      {initials}
    </span>
  );
};

const Author = ({ person }) => {
  const NameTag = (
    <span className="text-md truncate font-[400] text-[#414141] hover:underline md:text-[15px] md-xl:w-24">
      {person?.name}
    </span>
  );

  return (
    <div className="author flex items-center gap-2 py-2">
      <MiniAvatar person={person} />

      {person?._id ? (
        <Link to={profileUrl(person)}>{NameTag}</Link>
      ) : (
        NameTag
      )}

      <div className="h-4 w-[1px] bg-[#a9a9a9]" />
      <span className="text-md truncate font-[300] text-[#414141] md-xl:w-24">
        <span className="flex items-center justify-center gap-1">
          <svg
            className="fill-current text-[#666]"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z" />
          </svg>
          {person?.company}
        </span>
      </span>
    </div>
  );
};

export default Author;
