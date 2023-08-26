"use client";
import React from "react";
import NoteForm from "./NoteForm";
import NoteContextProvider, { useNoteContext } from "@/context/NoteContextProvider";
import CardNotes from "./CardNotes";

interface Props {
  notes: NoteType[];
}

interface NoteType {
  id?: number;
  title: string;
  content: string;
}

const FormLayout: React.FC<Props> = ({ notes }) => {





  return (
    <NoteContextProvider>
      <NoteForm />
      <CardNotes notes={notes}/>
    
    </NoteContextProvider>
  );
};

export default FormLayout;
