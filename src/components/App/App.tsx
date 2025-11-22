import { useEffect, useState } from 'react';
import NoteList from '../NoteList/NoteList';
import fetchNotes from '../../services/noteService';
import css from './App.module.css';
import ReactPaginate from 'react-paginate';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import type { Note } from '../../types/note';

import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function App() {
  const query = '';
  const page = 1;
  const sortOrder = 'created';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, page, sortOrder],
    queryFn: () => fetchNotes(query, page, sortOrder),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {data && !isLoading && <NoteList notes={data.notes} />}
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}
