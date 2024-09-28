import { useState } from "react";
import Category from "../components/Category";
import { CategoryType } from "../types/categoryTypes";

interface TasksProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Tasks({ setOpen }: TasksProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  function addCategory() {
    setCategories((prev) => [
      ...prev,
      { id: prev.length + 1, categoryName: "New Category" },
    ]);
  }
  function updateTheCategory(name: string, id: number) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { id: id, categoryName: name } : c))
    );
  }
  return (
    <section className="home-section">
      <div className="home-content">
        <i className="bx bx-menu" onClick={() => setOpen((prev) => !prev)}>
          d
        </i>
      </div>
      <div className="container-title">
        <h1 className="title-task">Task Management</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, vero!
        </p>
      </div>
      <div className="container-tasks">
        <div id="categories">
          {categories?.map((category, index) => (
            <Category
              setValue={updateTheCategory}
              key={index}
              category={category}
            />
          ))}
          {/* Add categories here */}
        </div>
        <div id="btn" className="addContainer" onClick={addCategory}>
          <p className="pa">Add</p>
          <svg
            className="svg"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Tasks;
