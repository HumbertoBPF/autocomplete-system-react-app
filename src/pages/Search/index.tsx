import { Box, Button, Container, Typography } from '@mui/material';
import SearchBar from 'components/SearchBar';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [searchedWord, setSearchedWord] = useState('');

    const navigate = useNavigate();

    const handleChange = (
        event: SyntheticEvent<Element, Event>,
        value: string
    ) => {
        setSearchedWord(value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search?q=${searchedWord}`);
    };

    return (
        <Container
            sx={{
                p: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                component="form"
                maxWidth="584px"
                onSubmit={handleSubmit}
                width={{ xs: '100%', md: '50%' }}
                height="100vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography mb="24px" variant="h3">
                    Dictionary
                </Typography>
                <SearchBar
                    fullWidth
                    onChange={handleChange}
                    value={searchedWord}
                />
                <Button
                    color="secondary"
                    type="submit"
                    variant="contained"
                    data-testid="submit-button"
                >
                    Search
                </Button>
            </Box>
        </Container>
    );
}

export default Search;
