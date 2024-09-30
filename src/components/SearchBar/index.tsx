import { Search } from '@mui/icons-material';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { instance } from 'api/http';
import { ReactNode, SyntheticEvent, useRef, useState } from 'react';

interface SearchBarProps {
    endAdornment?: ReactNode;
    fullWidth?: boolean;
    onChange: (event: SyntheticEvent<Element, Event>, value: string) => void;
    value: string;
}

function SearchBar({
    endAdornment,
    fullWidth = false,
    onChange,
    value,
}: SearchBarProps) {
    const [options, setOptions] = useState<string[]>([]);
    const query = useRef<string>('');

    const handleChange = (
        event: SyntheticEvent<Element, Event>,
        value: string
    ) => {
        const searchParams = new URLSearchParams();

        searchParams.set('query', value);
        query.current = value;

        instance
            .get(`/autocomplete?${searchParams}`)
            .then((response) => {
                const { data, request } = response;
                const { responseURL } = request;

                if (
                    responseURL ===
                    `${process.env.REACT_APP_API_URL}/autocomplete?query=${query.current}`
                ) {
                    setOptions(data);
                }
            })
            .catch(() => {});

        onChange(event, value);
    };

    return (
        <Autocomplete
            filterOptions={(x) => x}
            fullWidth={fullWidth}
            freeSolo
            onInputChange={handleChange}
            options={options.map((option) => option)}
            renderInput={(params) => (
                <TextField
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment,
                        },
                    }}
                    {...params}
                />
            )}
            sx={{ mb: '24px' }}
            value={value}
        />
    );
}

export default SearchBar;
