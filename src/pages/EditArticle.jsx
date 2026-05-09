import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Create from "./Create";
import { getBlog } from "../api/blogs";
import { useUser } from "../context/UserContext";
import Spinner from "../components/ui/Spinner";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getBlog(id);
        if (cancelled) return;
        setArticle(data);
      } catch (err) {
        if (cancelled) return;
        if (err?.response?.status === 404) {
          navigate("/profile/me");
        } else {
          console.error(err);
          navigate("/profile/me");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  useEffect(() => {
    if (!article || !user || userLoading) return;
    const articleAuthorId =
      typeof article.authorId === "string"
        ? article.authorId
        : article.authorId?._id;
    if (articleAuthorId && user._id && articleAuthorId !== user._id) {
      setForbidden(true);
    }
  }, [article, user, userLoading]);

  if (loading || userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner color="#212121" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 text-[#212121]">
        <p>You are not the author of this article.</p>
        <button
          onClick={() => navigate("/profile/me")}
          className="underline"
        >
          Back to my profile
        </button>
      </div>
    );
  }

  return <Create mode="edit" articleId={id} initialArticle={article} />;
};

export default EditArticle;
