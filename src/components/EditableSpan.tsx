import { ChangeEvent, useState } from "react";

type Props = {
  oldTitle: string;
  onClick: (updatedTitle: string) => void;
};

export const EditableSpan = ({ oldTitle, onClick }: Props) => {
  const [edit, setEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(oldTitle);

  const editHandler = () => {
    setEdit(!edit);
    if (edit) {
      onClick(updatedTitle);
    }
  };

  const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.currentTarget.value);
  };

  return edit ? (
    <input
      value={updatedTitle}
      onBlur={editHandler}
      autoFocus
      onChange={updateTitleHandler}
    />
  ) : (
    <span onDoubleClick={editHandler}>{oldTitle}</span>
  );
};
