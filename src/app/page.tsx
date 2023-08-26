import FormLayout from "@/components/FormLayout";


async function loadNotes() {
  const res = await fetch("http://localhost:3000/api/notes");
  const data = await res.json();
  return data;
}

export default async function Home() {

  //TODO: GET ALL FROM DB
  const { notes } = await loadNotes();

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
       <FormLayout notes={notes}/>
      </div>
    </div>
  );
}
