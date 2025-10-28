import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { appBaseUrl, defaultOgImage } from "@/config/metaData";

export const metadata: Metadata = {
  title: "Create new note — NoteHub",
  description: "Add a new note to your NoteHub collection.",
  openGraph: {
    title: "Create new note — NoteHub",
    description: "Add a new note to your NoteHub collection.",
    url: `${appBaseUrl}/notes/action/create`,
    images: [defaultOgImage],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
