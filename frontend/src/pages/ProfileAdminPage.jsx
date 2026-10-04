import React, { useRef, useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import { createProject } from "../app/api.js";

const initialProfile = { client: "", handle: "", followers: "", profileUrl: "" };

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);
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
    // The model retains platform as a required legacy field; profile cards don't display it.
    payload.append("platform", "Instagram");
    payload.append("avatar", avatar);
    payload.append("image", image);

    try {
      const result = await createProject(payload);
      setProfile(initialProfile);
      setAvatar(null);
      setImage(null);
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
        <p className="profile-admin-intro">Upload a name, username, follower count, avatar and profile picture. Saved profiles appear in Work.</p>
        <form ref={formRef} className="enquiry-form profile-admin-form" onSubmit={submit}>
          <div className="form-row">
            <label>Name<input name="client" value={profile.client} onChange={updateField} maxLength="100" required /></label>
            <label>Username<input name="handle" value={profile.handle} onChange={updateField} maxLength="100" required placeholder="@username" /></label>
          </div>
          <div className="form-row">
            <label>Follower count<input name="followers" type="number" min="0" value={profile.followers} onChange={updateField} required /></label>
            <label>Profile URL (optional)<input name="profileUrl" type="url" value={profile.profileUrl} onChange={updateField} placeholder="https://instagram.com/username" /></label>
          </div>
          <div className="form-row">
            <label className="profile-avatar-field">Avatar photo
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setAvatar(event.target.files?.[0] || null)} required />
              <small>JPG, PNG, WebP or GIF, up to 5 MB.</small>
            </label>
            <label className="profile-avatar-field">Profile picture
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setImage(event.target.files?.[0] || null)} required />
              <small>Shown as the large image on the Work card, up to 5 MB.</small>
            </label>
          </div>
          {status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
          <button className="button primary" type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}<span aria-hidden="true">↗</span></button>
        </form>
      </section>
    </PageLayout>
  );
}
