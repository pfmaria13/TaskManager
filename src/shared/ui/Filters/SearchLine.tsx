import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

interface SearchLineProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchLine = ({ value, onChange }: SearchLineProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange(""); // Сбрасываем поисковый запрос
  };

  return (
    <TextField
      fullWidth
      placeholder="Поиск по названию задачи"
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 3,
        "& .MuiInputBase-root": { height: 40, fontSize: "0.9rem", py: 0.5 },
        "& .MuiInputLabel-root": { fontSize: "0.9rem", top: -3 },
      }}
    />
  );
};
