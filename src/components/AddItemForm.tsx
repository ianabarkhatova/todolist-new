import { ChangeEvent, KeyboardEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { addButtonSx } from "../Button.styles.ts";
import Box from "@mui/material/Box";

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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        error={!!error}
        id="outlined-basic"
        label={error ? error : "Enter a title"}
        variant="outlined"
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={addItemOnEnterHandler}
        size="small"
      />

      <Button sx={addButtonSx} variant="contained" onClick={addItemHandler}>
        +
      </Button>
    </Box>
  );
};
