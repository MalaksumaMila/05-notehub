import axios from 'axios';
import type { Note } from '../types/note';
import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export interface fetchNotesResponse {
  notes: Note[];
  perPage: number;
}
export interface createNoteResponse {
  note: Note;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export type SortOrder = 'created' | 'updated';
export default async function fetchNotes(
  query: string,
  page: number,
  sortOrder: SortOrder
): Promise<fetchNotesResponse> {
  return { notes: [], perPage: 0 };

  try {
    const response = await axios.get<fetchNotesResponse>(`/notes`, {
      params: {
        search: query,
        page,
        sortBy: sortOrder,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    toast.error('There was an error, please try again...');
    return { notes: [], perPage: 0 };
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
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
};
