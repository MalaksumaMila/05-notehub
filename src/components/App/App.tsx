import { useState } from 'react';
import NoteList from '../NoteList/NoteList';
import fetchNotes from '../../services/noteService';
import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const query = '';
  const sortOrder = 'created';
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', query, page, sortOrder],
    queryFn: () => fetchNotes(query, page, sortOrder),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.perPage ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {data && !isLoading && <NoteList notes={data.notes} />}
        {/* Компонент SearchBox */}
        {isSuccess && pageCount > 1 && (
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        )}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm closeModal={closeModal} />
          </Modal>
        )}
        {
          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        }
      </header>
    </div>
  );
}
