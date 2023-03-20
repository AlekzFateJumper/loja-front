import * as React from 'react';
import { TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';

export default function Search({ onChange }) {
  const debounceSearch = React.useCallback(debounce((e) => onChange(e.target.value), 300), []);

  return (
      <TextField
        id="search-input"
        variant="standard"
        onChange={ debounceSearch }
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
