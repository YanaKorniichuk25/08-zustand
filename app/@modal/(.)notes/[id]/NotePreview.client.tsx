"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const noteId = Array.isArray(id) ? id[0] : id;

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNote(noteId!),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}
      {note && (
        <div className={css.item}>
          <h2 className={css.header}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.header}>
            <span className={css.tag}>{note.tag}</span>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button className={css.backBtn} onClick={handleClose}>
            {"< Back"}
          </button>
        </div>
      )}
    </Modal>
  );
}
