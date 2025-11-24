import { useState } from 'react';
import NoteList from '../NoteList/NoteList';
import fetchNotes from '../../services/noteService';
import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const sortOrder = 'created';
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const perPage = 12;

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', query, page, sortOrder, perPage],
    queryFn: () => fetchNotes(query, page, sortOrder, perPage),

    placeholderData: keepPreviousData,
  });

  const pageCount = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log(data);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {isSuccess && pageCount > 1 && (
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        )}

        {/* Компонент SearchBox */}

        {
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        }
      </header>

      {isSuccess && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
