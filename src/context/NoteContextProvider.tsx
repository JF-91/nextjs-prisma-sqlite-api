"use client";
import { createContext, useContext, useState } from "react";

interface Prop {
  children: React.ReactNode;
}

type NotesType = {
  id?: number;
  title: string;
  content: string;
};

type ContextType = {
  newNotes: (e: NotesType) => void;
  deleteNote: (id: number) => void;
  updateNote: (values: NotesType) => void;
};

const ContextNote = createContext<ContextType | null>(null);

import React from "react";

const NoteContextProvider: React.FC<Prop> = ({ children }) => {
  const [notes, setNotes] = useState<NotesType>();

  //TODO: CREATE NOTE

  function newNotes(value: NotesType) {
    //post to api
    const postFormData = async () => {
      const { title, content } = value;

      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setNotes(data);
      console.log(data);
    };

    return postFormData();
  }

  //TODO: DELETE NOTE

  function deleteNote(id: number) {
    //delete from api
    async function deleteNote(id: number) {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);

      return data;
    }

    deleteNote(id);
  }

  //TODO: UPDATE NOTE

  function updateNote(values: NotesType) {
    //update the Note
    
    async function update(values: NotesType) {
      const {title, content, id} = values
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    }

    update(values);
  }

  // functions that  cann use the context
  const value = {
    newNotes,
    deleteNote,
    updateNote,
  };

  return <ContextNote.Provider value={value}>{children}</ContextNote.Provider>;
};

export default NoteContextProvider;

export const useNoteContext = () => {
  const contexto = useContext(ContextNote);
  if (!contexto) {
    throw new Error("No hay contexto");
  }
  return contexto;
};
