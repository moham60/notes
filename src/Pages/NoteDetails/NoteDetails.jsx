import { NoteCard } from "../../Component/NoteCard/NoteCard";




export function Note() {
   
        const note=JSON.parse(localStorage?.getItem("SelectedNote"))
  
    return (
        <div className="NotePage min-h-screen relative   px-10 py-2 ">
            
            <div className="Note  ">
                <NoteCard note={note}/>
            </div>
        </div>
  );
}