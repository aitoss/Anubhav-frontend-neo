import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Landing/Footer/Footer";
import ButtonV5 from "../components/ui/buttonv5";
import Spinner from "../components/ui/Spinner";
import BackgroundDots from "../assets/Background";
import SuccessMessage from "../components/notification/SuccessMessage";
import { useUser } from "../context/UserContext";
import { updateMe } from "../api/me";
import useErrorToast from "../hooks/useErrorToast";
import { profileUrl } from "../utils/slug";

const inputClass =
  "text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px]";

const LINKEDIN_RE = /^https?:\/\/(www\.)?linkedin\.com\/.+/i;

const Profile = () => {
  const { user, loading, setUser } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", contact: "", linkedinUrl: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [requestSend, setRequestSend] = useState(false);
  const showError = useErrorToast();

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        contact: user.contact || "",
        linkedinUrl: user.linkedinUrl || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (form.linkedinUrl && !LINKEDIN_RE.test(form.linkedinUrl.trim())) {
      next.linkedinUrl =
        "Enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username)";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const updated = await updateMe({
        ...form,
        linkedinUrl: form.linkedinUrl.trim(),
      });
      setUser(updated);
      setRequestSend("Profile updated successfully");
      setTimeout(() => navigate(profileUrl(updated)), 900);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const Shell = ({ children }) => (
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
      <SuccessMessage requestSend={requestSend} setRequestSend={setRequestSend} />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-24 md:px-6 lg:px-14">
        {children}
      </div>
      <Footer />
    </>
  );

  if (loading) {
    return (
      <Shell>
        <div className="flex h-[40vh] items-center justify-center">
          <Spinner color="#212121" />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-4xl font-[500] tracking-tight text-[#212121] x-sm:text-3xl">
            Edit Profile
          </h1>
          <Link
            to={user ? profileUrl(user) : "/profile/me"}
            className="text-sm text-[#666] hover:text-[#212121] hover:underline"
          >
            ← Back to my profile
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#d2d2d6] bg-[#fff9] p-6 shadow-2xl md:p-8">
          {user?.email && (
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-[#f9f9f9] px-3 py-2 text-sm text-[#3C3C43]">
              <span className="text-[#666]">Signed in as</span>
              <span className="font-[500] text-[#212121]">{user.email}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h4 className="text-[#212121]">Name</h4>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#212121]">Contact</h4>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Phone or alt email"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#212121]">LinkedIn URL</h4>
              <input
                name="linkedinUrl"
                value={form.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-handle"
                className={inputClass}
              />
              {errors.linkedinUrl && (
                <p className="px-1 pt-1 text-sm text-red-500">
                  {errors.linkedinUrl}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                disabled={saving}
                className="border-0 bg-transparent p-0 outline-none focus:outline-none"
              >
                <ButtonV5 icon={false} disabled={saving}>
                  <div className="flex items-center justify-center gap-2">
                    {saving && <Spinner color="#fff" />}
                    <h5 className="flex gap-1 text-[16px] font-[400] -tracking-[0.2px]">
                      {saving ? "Saving…" : "Save changes"}
                    </h5>
                  </div>
                </ButtonV5>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Shell>
  );
};

export default Profile;
