export const slugify = (str = "") =>
  String(str)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

export const profileUrl = (user) => {
  if (!user) return "#";
  const id = user._id || user.id;
  if (!id) return "#";
  const slug = slugify(user.name || "");
  return slug ? `/u/${id}/${slug}` : `/u/${id}`;
};
