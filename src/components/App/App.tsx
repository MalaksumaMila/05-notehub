import { useEffect, useState } from 'react';
import css from './App.module.css';
import ReactPaginate from 'react-paginate';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import type {} from '../../types/note';

import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
