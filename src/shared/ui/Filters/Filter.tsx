import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Filter = ({ label, options, value, onChange }: FilterProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <FormControl sx={{ minWidth: 180, maxWidth: 250 }}>
      <InputLabel sx={{ fontSize: "0.9rem", top: -6 }}>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        sx={{
          height: 40,
          "& .MuiSelect-select": { py: 0.1 },
        }}
        endAdornment={
          value && (
            <IconButton
              sx={{
                display: value ? "inline-flex" : "none",
                mr: 1,
                height: 40,
              }}
              onClick={handleClear}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )
        }
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={{ fontSize: "0.85rem" }}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
