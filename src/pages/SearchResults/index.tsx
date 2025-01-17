import { Search } from '@mui/icons-material';
import {
    Box,
    Container,
    IconButton,
    InputAdornment,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';
import { searchWord } from 'api/endpoints';
import SearchBar from 'components/SearchBar';
import IWord from 'interfaces/IWord';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [word, setWord] = useState<IWord>();
    const [searchedWord, setSearchedWord] = useState(query);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setWord(undefined);
        setLoading(true);

        const searchParams = new URLSearchParams();

        searchParams.set('query', query ?? '');

        searchWord(searchParams)
            .then((response) => {
                const { data } = response;
                setLoading(false);
                setWord(data);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [query]);

    const handleChange = (
        event: SyntheticEvent<Element, Event>,
        value: string
    ) => {
        setSearchedWord(value);
    };

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search?q=${searchedWord}`);
    };

    const renderResults = () => {
        return word ? (
            <>
                <Typography variant="h3" data-testid="word">
                    {word.word}
                </Typography>
                <ol>
                    {word.meanings.map((meaning, index) => (
                        <li key={index} data-testid={`meaning-${index}`}>
                            {meaning.text}
                        </li>
                    ))}
                </ol>
            </>
        ) : (
            <>
                <Box display="flex" alignItems="center">
                    <Box
                        alignItems="center"
                        borderRadius="8px"
                        display="flex"
                        height="56px"
                        justifyContent="center"
                        width="56px"
                        sx={{
                            backgroundColor: '#f9ab00',
                        }}
                    >
                        <Search sx={{ width: '24px', height: '24px' }} />
                    </Box>
                    <Typography
                        sx={{ ml: '16px' }}
                        display="inline"
                        variant="h6"
                        data-testid="not-found"
                    >
                        No result was found for your search
                    </Typography>
                </Box>
            </>
        );
    };

    return (
        <Container sx={{ p: '16px' }}>
            <Box component="form" onSubmit={handleSearch}>
                <SearchBar
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="search" type="submit">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={handleChange}
                    value={searchedWord ?? ''}
                />
            </Box>

            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                    <Skeleton variant="rectangular" />
                    <Skeleton variant="rectangular" />
                </Stack>
            ) : (
                renderResults()
            )}
        </Container>
    );
}

export default SearchResults;
