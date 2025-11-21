import axios from 'axios';
import type {} from '../types/note';
import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
