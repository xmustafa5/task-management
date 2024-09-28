// src/components/Category.tsx

import { useEffect, useRef, useState } from "react";
import { CategoryType } from "../types/categoryTypes";

interface CategoryProps {
  category: CategoryType; // Define props interface
  setValue: (name: string, id: number) => void; 
}

export default function Category({ category , setValue }: CategoryProps) {
  // Use the props interface here
  const [openEditMode, setOpenEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function toggleOpenEditMode(name?:string,id?:number) {
    setOpenEditMode((prev) => !prev);
    setValue(name,id)
  }
  useEffect(() => {
    if (!openEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openEditMode]);

  return (
    <div className="box">
      {openEditMode ? (
        <p onClick={()=>toggleOpenEditMode()}>{category?.categoryName}</p>
      ) : (
        <input
          ref={inputRef}
          defaultValue={category?.categoryName}
          onBlur={(e)=>toggleOpenEditMode(e.target.value,category?.id)}
          
        />
      )}
    </div>
  );
}
