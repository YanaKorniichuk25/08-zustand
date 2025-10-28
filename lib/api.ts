import axios from "axios";
import toast from "react-hot-toast";
import { Note } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL ??
    "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    toast.error(`API Error: ${message}`);
    return Promise.reject(error);
  }
);

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: {
  page: number;
  search: string;
  tag?: string;
}): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      search,
      perPage: 12,
      ...(tag && tag !== "All" ? { tag } : {}),
      sortBy: "created",
    },
  });
  return data;
};

export const getSingleNote = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note, {
    headers: { "Content-Type": "application/json" },
  });
  toast.success("Note added successfully!");
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  toast.success("Note deleted successfully!");
  return data;
};
