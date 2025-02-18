import { Button } from "./Button.tsx";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type Props = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim()) {
      addItem(title.trim());
      setTitle("");
    } else setError("Title is required");
  };

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value);
  };

  const addItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItemHandler();
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={addItemOnEnterHandler}
        className={error ? "error" : ""}
      />
      <Button title={"+"} onClick={addItemHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
