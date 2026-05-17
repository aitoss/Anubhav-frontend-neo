import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { profileUrl, slugify } from "../utils/slug";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Landing/Footer/Footer";
import Spinner from "../components/ui/Spinner";
import ButtonV5 from "../components/ui/buttonv5";
import BackgroundDots from "../assets/Background";
import BlogCard from "../components/BlogSection/BlogCard";
import SearchCardLoading from "../components/Search/SearchCardLoading";
import { useUser } from "../context/UserContext";
import { getUser, getUserArticles } from "../api/users";
import { getMyArticles } from "../api/me";
import { ReadTime, formatDate } from "../services/date";
import companyFallback from "/assets/images/company.png";

const PAGE_SIZE = 10;

const Avatar = ({ user, size = 96 }) => {
  if (user?.logoUrl) {
    return (
      <img
        src={user.logoUrl}
        alt={user.name}
        className="rounded-full border border-[#e5e7eb] object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = (user?.name || "?")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="group relative flex items-center justify-center overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: "#212121",
        border: "1px solid #0a0a0a",
      }}
    >
      <span
        className="absolute -top-1/2 left-1/2 h-3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-100 blur-[16px]"
        aria-hidden="true"
      />
      <span
        className="absolute inset-0 rounded-full border-t border-[#ffffff60]"
        aria-hidden="true"
      />
      <span
        className="text-shadow relative font-[500] text-white"
        style={{
          fontSize: size / 3,
          textShadow: "0 1px 1px rgba(0, 0, 0, 0.08)",
        }}
      >
        {initials}
      </span>
    </div>
  );
};

const CollegeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#666"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M22 9 12 4 2 9l10 5 10-5Z" strokeLinejoin="round" />
    <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" strokeLinejoin="round" />
    <path d="M22 9v6" strokeLinecap="round" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const ProfileShell = ({ children }) => (
  <>
    <Navbar />
    <BackgroundDots
      dotSize={1.8}
      dotColor="#cbcbcc"
      backgroundColor=""
      gap={15}
      className="custom-class"
      fade={true}
    />
    <div className="relative mx-auto h-full w-full max-w-[1440px] px-4 pb-16 pt-24 md:px-6 lg:px-14">
      {children}
    </div>
    <Footer />
  </>
);

const PublicProfile = () => {
  const params = useParams();
  const location = useLocation();
  const { user: currentUser, loading: userLoading } = useUser();

  const isMeRoute = location.pathname === "/profile/me" || params.userId === "me";
  const routeId = params.userId;
  const targetId = isMeRoute ? currentUser?._id : routeId;
  const isOwner = currentUser && targetId && currentUser._id === targetId;

  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isMeRoute && userLoading) return;
    if (!targetId) {
      if (!userLoading) setError("Profile not found");
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    setProfile(null);
    setArticles([]);
    setTotal(0);

    const profilePromise =
      isOwner && currentUser ? Promise.resolve(currentUser) : getUser(targetId);
    const articlesPromise = isOwner
      ? getMyArticles({ page, limit: PAGE_SIZE })
      : getUserArticles(targetId, { page, limit: PAGE_SIZE });

    Promise.all([profilePromise, articlesPromise])
      .then(([u, list]) => {
        if (cancelled) return;
        setProfile(u);
        setArticles(list.articles || []);
        setTotal(list.total || 0);
      })
      .catch((err) => {
        if (cancelled) return;
        const status = err?.response?.status;
        if (status === 404) setError("Profile not found");
        else setError(err?.response?.data?.message || "Failed to load profile");
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [targetId, page, isOwner, currentUser, userLoading, isMeRoute]);

  if (isMeRoute && !userLoading && !currentUser) {
    return <Navigate to="/auth?redirectToPath=%2Fprofile%2Fme" replace />;
  }

  if (isMeRoute && currentUser?._id) {
    return <Navigate to={profileUrl(currentUser)} replace />;
  }

  // Only canonicalize the slug once the loaded profile actually matches the URL's userId.
  // Otherwise stale `profile` from the previous route would redirect us back to the old user.
  if (profile?._id && profile._id === targetId && profile?.name) {
    const wantedSlug = slugify(profile.name);
    if (wantedSlug && params.slug !== wantedSlug) {
      return <Navigate to={profileUrl(profile)} replace />;
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (loading || (isMeRoute && userLoading)) {
    return (
      <ProfileShell>
        <div className="flex h-[40vh] items-center justify-center">
          <Spinner color="#212121" />
        </div>
      </ProfileShell>
    );
  }

  if (error || !profile) {
    return (
      <ProfileShell>
        <div className="flex h-[40vh] flex-col items-center justify-center gap-3 text-[#212121]">
          <p className="text-lg font-[400]">{error || "Profile not found"}</p>
          <Link to="/" className="text-sm text-[#666] underline">
            Back to home
          </Link>
        </div>
      </ProfileShell>
    );
  }

  return (
    <ProfileShell>
      {/* Profile header — landing-style elevated card */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 overflow-hidden rounded-3xl border border-[#d2d2d6] bg-[#fff9] p-6 md:flex-row md:items-center md:p-8">
        <div className="flex justify-between w-full">
          <Avatar user={profile} size={104} />
          {isOwner && (
            <div className="flex flex-shrink-0">
              <Link to="/profile/edit">
                <ButtonV5 icon={false} color="#f8f8f8">
                  <h5 className="flex gap-1 text-[16px] font-[400] -tracking-[0.2px] text-[#212121]">
                    Edit Profile
                  </h5>
                </ButtonV5>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-4xl font-[500] tracking-tight text-[#212121] x-sm:text-3xl">
            {profile.name || "Unnamed user"}
          </h1>

          {/* TODO: make `college` user-editable; for now show a default. */}
          <div className="flex items-center gap-1.5 pt-1 text-[14px] text-[#414141]">
            <CollegeIcon />
            <span className="font-[400]">
              {profile.college || "Army Institute Of Technology, Pune"}
            </span>
          </div>

          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex w-max items-center gap-1.5 text-[14px] text-[#0a66c2] hover:underline"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          )}

          {profile.createdAt && (
            <p className="pt-2 text-xs text-[#888]">
              Joined {formatDate(profile.createdAt)}
            </p>
          )}
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-5xl pt-8">
        <h2 className="px-1 pb-4 text-2xl font-[500] tracking-tight text-[#212121]">
          {isOwner ? "My Articles" : "Articles"}
          <span className="ml-2 text-sm font-[400] text-[#888]">({total})</span>
        </h2>

        <div className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-lg md:p-6">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#d3ddeb] bg-white/60 p-12 text-center">
            <p className="text-[#666]">
              {isOwner
                ? "You haven't published any articles yet."
                : "No articles published yet."}
            </p>
            {isOwner && (
              <Link to="/create">
                <ButtonV5 icon={false}>
                  <h5 className="flex gap-1 text-[15px] font-[400] -tracking-[0.2px]">
                    Write your first article
                  </h5>
                </ButtonV5>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {articles.map((a) => {
              const author = profile;
              return (
                <BlogCard
                  key={a._id}
                  id={a._id}
                  link={`/blog/${a._id}`}
                  Title={a.title}
                  imagesrc={
                    a.imageUrl && a.imageUrl !== "your_image_url_here"
                      ? a.imageUrl
                      : companyFallback
                  }
                  author={author?.name}
                  authorId={author?._id}
                  authorLogoUrl={author?.logoUrl}
                  company={a.companyName}
                  readingTime={ReadTime(a.description || "")}
                  date={formatDate(a.createdAt)}
                  ownerEditPath={isOwner ? `/edit/${a._id}` : null}
                />
              );
            })}
            {loading && <SearchCardLoading />}
          </div>
        )}

        {articles.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-[#d3ddeb] bg-white px-3 py-1 text-sm text-[#212121] disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm text-[#666]">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-[#d3ddeb] bg-white px-3 py-1 text-sm text-[#212121] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
        </div>
      </div>
    </ProfileShell>
  );
};

export default PublicProfile;
