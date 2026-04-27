import { useState } from "react";
import { API_URL,  BUYER_CLOUDINARY_URL} from "../../utils/constants";

const EditProfileModal = ({ profile, onClose, onUpdate }) => {
  const [name, setName] = useState(profile.buyer_name);
  const [village, setVillage] = useState(profile.buyer_village);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(
    profile.buyer_image_path
      ? `${BUYER_CLOUDINARY_URL}${profile.buyer_image_path}`
      : null
  );
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("buyer_name", name);
      formData.append("buyer_village", village);

      if (file) {
        formData.append("buyer_photo", file);
      }
      const res = await fetch(`${API_URL}/api/buyer/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await res.json();

      if (!json.success) throw new Error(json.message);

      onUpdate(json.data);
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-dark-card p-5 space-y-4">

        <h2 className="text-lg font-heading font-semibold">
          Edit Profile
        </h2>

        {/* Image */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                {name?.[0]}
              </div>
            )}
          </div>

          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
        />

        {/* Village */}
        <input
          type="text"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Village"
        />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border rounded py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-brand-500 text-white rounded py-2"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;