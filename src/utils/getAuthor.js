export const getAuthor = (article) => {
  if (!article) return null;
  if (article.authorId && typeof article.authorId === "object") {
    return {
      _id: article.authorId._id,
      name: article.authorId.name,
      contact: article.authorId.contact || article.authorId.email,
      logoUrl: article.authorId.logoUrl,
      linkedinUrl: article.authorId.linkedinUrl,
    };
  }
  if (typeof article.authorId === "string") {
    return {
      _id: article.authorId,
      ...(article.author || {}),
    };
  }
  return article.author ? { ...article.author } : null;
};
