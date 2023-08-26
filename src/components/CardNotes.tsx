import { useNoteContext } from "@/context/NoteContextProvider";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";




interface Props {
  notes: NoteType[];
}

interface NoteType {
  id?: number;
  title: string;
  content: string;
}

const CardNotes: React.FC<Props> = ({ notes }) => {

    const [open, setOpen] = useState(false)

    //ref to input after click to update button
    const inputRef = useRef<HTMLInputElement>(null);

    // refresh the browser
    const router = useRouter();

    //context
  const {deleteNote, updateNote} = useNoteContext();

    //delete the Note
  const ClickDeleteNote = ( id: number)=>{
    deleteNote(id)
    router.refresh()
  }

    //update the note
    const ClickUpdateNote = (values: NoteType)=>{
        updateNote(values)
        console.log(values);
        
        inputRef.current?.focus();
    }


  return (
    <>
      <hr className="py-4 mt-4" />
      {notes.map((note: any) => (
        <div key={note.id} className="bg-slate-400 p-4 m-2">
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button
            className="bg-red-500 m-2 rounded-md p-1 hover:bg-purple-300"
            onClick={()=>ClickDeleteNote(note.id)}
            
          >
            delete
          </button>
          <button
            className="bg-green-400 m-2 rounded-md p-1 hover:bg-green-200"
            onClick={() =>ClickUpdateNote(note)}
          >
            update
          </button>
        
        </div>
      ))}
    </>
  );
};

export default CardNotes;
