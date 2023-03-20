import * as React from 'react';
import { TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export default function Search({ onChange }) {
  return (
      <TextField
        id="search-input"
        variant="standard"
        onChange={ (e) => {
          onChange(e.target.value);
        }}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "#FFF" }} />
              </InputAdornment>
            ),
            style: {
              color: "#FFF",
              borderBottom: "1px solid #FFF",
            },
          }}
        />
  );
}
