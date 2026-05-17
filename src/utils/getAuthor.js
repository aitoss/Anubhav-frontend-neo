const ANON = "Anonymous";

export const getAuthor = (article) => {
  if (!article) return { name: ANON };
  if (article.authorId && typeof article.authorId === "object") {
    return {
      _id: article.authorId._id,
      name: article.authorId.name || ANON,
      contact: article.authorId.contact || article.authorId.email,
      logoUrl: article.authorId.logoUrl,
      linkedinUrl: article.authorId.linkedinUrl,
    };
  }
  if (typeof article.authorId === "string") {
    const embedded = article.author || {};
    return {
      _id: article.authorId,
      ...embedded,
      name: embedded.name || ANON,
    };
  }
  const embedded = article.author || {};
  return { ...embedded, name: embedded.name || ANON };
};
