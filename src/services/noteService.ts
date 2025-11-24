import axios from 'axios';
import type { Note, NoteTag } from '../types/note';
import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface createNoteResponse {
  note: Note;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

export type SortOrder = 'created' | 'updated';
export default async function fetchNotes(
  query: string,
  page: number,
  sortOrder: SortOrder,
  perPage: number
): Promise<fetchNotesResponse> {
  try {
    const response = await axios.get<fetchNotesResponse>(`/notes`, {
      params: {
        search: query || undefined,
        page,
        sortBy: sortOrder,
        perPage,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    console.log('API response:', response.data);

    return response.data;
  } catch (error) {
    toast.error('There was an error, please try again...');
    return { notes: [], totalPages: 0 };
  }
}

export const createNote = async (data: CreateNoteRequest): Promise<Note> => {
  const response = await axios.post<createNoteResponse>(`/notes`, data, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data.note;
};

export const deleteNote = async (id: Note['id']) => {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const updateNote = async (id: Note['id'], data: CreateNoteRequest) => {
  const response = await axios.put<Note>(`/notes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};
