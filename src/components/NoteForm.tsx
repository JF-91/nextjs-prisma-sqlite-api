"use client";
import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useNoteContext } from "@/context/NoteContextProvider";

interface FormData {
  title: string;
  content: string;
}

const NoteForm = () => {
  //context for create new note in the form
  const { newNotes, updateNote } = useNoteContext();

  // for router refreh
  const router = useRouter();

  //redirect to input  after sending
  const titleRef = useRef<HTMLInputElement>(null);
   


  //state the form
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });


  //TODO:   ON_SUBMIT
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // postFormData();
    newNotes(formData);

    
    router.refresh(); //refresh the browser
    setFormData({ title: "", content: "" }); //clean the form fields
    titleRef.current?.focus(); //redirect to the input field after to sending
  };

    //TODO: HANDLE EVENT IN THE INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          autoFocus
          placeholder="Title"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outlined-none focus:ring-blue-600 my-2"
          onChange={handleChange}
          ref={titleRef}
          value={formData.title}
        />
        <textarea
          name="content"
          autoFocus
          placeholder="Title"
          className="w-full px-4 py-2 text-black bg-white rounded-md focus:outlined-none focus:ring-blue-600 my-2"
          onChange={handleChange}
          value={formData.content}
        />
        <button className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                type="submit">
          Create
        </button>

      </form>
    </>
  );
};

export default NoteForm;
