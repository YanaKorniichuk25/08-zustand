"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";

type NoteFormProps = {
  onClose?: () => void; // додаємо проп onClose
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [form, setForm] = useState(draft);

  useEffect(() => {
    setForm(draft);
  }, [draft]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    setDraft(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createNote(form);
    clearDraft();
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className={css.input}
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Write your note..."
        className={css.textarea}
      />
      <select
        name="tag"
        value={form.tag}
        onChange={handleChange}
        className={css.select}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <div className={css.actions}>
        <button type="submit" className={css.submit}>
          Save
        </button>
        <button type="button" onClick={handleCancel} className={css.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
