// CountryAutocomplete.tsx
import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { TextField, Autocomplete } from '@mui/material';

const countries = ["France", "Belgique", "Allemagne", "Inconnu"];

interface CountryAutocompleteProps {
  data: string;
  handleChange: (path: string, value: any) => void;
  path: string;
}

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({ data, handleChange, path }) => {
  return (
    <Autocomplete
      options={countries}
      value={data}
      onChange={(event, newValue) => handleChange(path, newValue)}
      renderInput={(params) => <TextField {...params} label="Pays" />}
    />
  );
};

export default withJsonFormsControlProps(CountryAutocomplete);

