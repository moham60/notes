export function NoteCard({note}) {
    return (
        <div className="w-full md:w-[80%] mx-auto dark:text-white bg-white shadow dark:bg-gray-700 rounded py-2 px-20 ">
            <h3 className="text-center font-bold text-4xl ">{note.title}</h3>
            <p className="my-2 whitespace-pre-wrap text-xl">{note.content }</p>
        </div>
  );
}