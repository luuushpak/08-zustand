"use client";

import css from "@/app/notes/filter/[...slug]/Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { DEFAULT_QUERY, DEFAULT_PAGE } from "@/constants/notes";
import { Toaster } from "react-hot-toast";
import EmptyNotesMessage from "@/components/EmptyNotesMessage/EmptyNotesMessage";
import Loader from "@/components/Loader/Loader";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  tag: NoteTag | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes({ query, page, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;
  const fetchedNotes = data?.notes ?? [];

  const handleSelectPage = (selected: number) => {
    setPage(selected);
  };

  const handleInputChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onInputChange={handleInputChange} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            selectPage={handleSelectPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {fetchedNotes.length > 0 && <NoteList notes={fetchedNotes} />}
      {!isError && !isLoading && fetchedNotes.length === 0 && (
        <EmptyNotesMessage />
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default NotesClient;
