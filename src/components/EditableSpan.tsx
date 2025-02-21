import { ChangeEvent, useState } from "react";

type Props = {
  oldTitle: string;
  onClick: (updatedTitle: string) => void;
};

export const EditableSpan = ({ oldTitle, onClick }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(oldTitle);

  const editModeHandler = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      onClick(title);
    }
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return isEditMode ? (
    <input
      value={title}
      onBlur={editModeHandler}
      autoFocus
      onChange={changeTitleHandler}
    />
  ) : (
    <span onDoubleClick={editModeHandler}>{oldTitle}</span>
  );
};
