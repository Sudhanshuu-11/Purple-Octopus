import React, { useRef, useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import { createProject } from "../app/api.js";

const initialProfile = {
  client: "",
  handle: "",
  platform: "Instagram",
  profileUrl: "",
  followers: "",
  posts: "",
  type: "",
  metric: "",
  bio: "",
};

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [saving, setSaving] = useState(false);
  const formRef = useRef(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });

    const payload = new FormData();
    Object.entries(profile).forEach(([key, value]) => payload.append(key, value));
    payload.append("avatar", avatar);

    try {
      const result = await createProject(payload);
      setProfile(initialProfile);
      setAvatar(null);
      formRef.current?.reset();
      setStatus({ type: "success", message: result.message || "Profile saved and added to Work." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageLayout>
      <section className="profile-admin-page">
        <div className="section-kicker">/ PRIVATE PROFILE MANAGER</div>
        <h1>Add a<br /><em>collaborator.</em></h1>
        <p className="profile-admin-intro">Add a profile and verified audience details. Saved profiles appear in the Work section.</p>
        <form ref={formRef} className="enquiry-form profile-admin-form" onSubmit={submit}>
          <div className="form-row">
            <label>Person or brand name<input name="client" value={profile.client} onChange={updateField} maxLength="100" required /></label>
            <label>Profile handle<input name="handle" value={profile.handle} onChange={updateField} maxLength="100" required placeholder="@profile" /></label>
          </div>
          <div className="form-row">
            <label>Platform
              <select name="platform" value={profile.platform} onChange={updateField}>
                <option>Instagram</option><option>Facebook</option><option>LinkedIn</option>
              </select>
            </label>
            <label>Profile URL<input name="profileUrl" type="url" value={profile.profileUrl} onChange={updateField} placeholder="https://…" /></label>
          </div>
          <div className="form-row">
            <label>Followers<input name="followers" type="number" min="0" value={profile.followers} onChange={updateField} required /></label>
            <label>Post count<input name="posts" type="number" min="0" value={profile.posts} onChange={updateField} /></label>
          </div>
          <div className="form-row">
            <label>Work type<input name="type" value={profile.type} onChange={updateField} maxLength="100" placeholder="Campaign, content, strategy…" /></label>
            <label>Verified result (optional)<input name="metric" value={profile.metric} onChange={updateField} maxLength="30" placeholder="e.g. +24%" /></label>
          </div>
          <label className="profile-avatar-field">Profile avatar
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setAvatar(event.target.files?.[0] || null)} required />
            <small>JPG, PNG, WebP or GIF. Maximum 5 MB.</small>
          </label>
          <label className="profile-bio-field">Short description<textarea name="bio" value={profile.bio} onChange={updateField} maxLength="240" rows="3" placeholder="Describe the person, brand or work." /></label>
          {status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
          <button className="button primary" type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}<span aria-hidden="true">↗</span></button>
        </form>
      </section>
    </PageLayout>
  );
}
