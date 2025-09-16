import React, { useState } from "react";
import { BiChevronDown, BiChevronUp, BiHeart, BiHeartFill, BiClipboard } from "react-icons/bi";
import Toast from "./Toast";

export default function Bio() {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type?: "success" | "error" }[]>([]);

  const addToast = (message: string, type?: "success" | "error") => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    addToast(expanded ? "Collapsed" : "Expanded");
  };

  const toggleLike = () => {
    setLiked(!liked);
    addToast(liked ? "Removed from likes" : "Added to likes", liked ? "error" : "success");
  };

  const copyBio = async () => {
    try {
      await navigator.clipboard.writeText(
        "When: You want deterministic truncation (e.g., 140 chars or 30 words) regardless of layout..."
      );
      addToast("Bio copied to clipboard!");
    } catch {
      addToast("Failed to copy bio", "error");
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Toast container */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => {}} />
        ))}
      </div>

      {/* Bio box */}
      <div
        className={`relative p-4 rounded-lg bg-white shadow-md transition-all ${
          expanded ? "max-h-full" : "line-clamp-3"
        }`}
      >
        When: You want deterministic truncation (e.g., 140 chars or 30 words) regardless of layout.
        Pros: Works everywhere, exact control. Cons: Mutates text; you must store the full text to
        restore on “Read less”. Very long text goes here...
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={toggleExpand}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white"
        >
          {expanded ? "Read less" : "Read more"} {expanded ? <BiChevronUp /> : <BiChevronDown />}
        </button>

        <button
          onClick={toggleLike}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white"
        >
          {liked ? <BiHeartFill /> : <BiHeart />} Like
        </button>

        <button
          onClick={copyBio}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white"
        >
          <BiClipboard /> Copy
        </button>
      </div>
    </div>
  );
}
