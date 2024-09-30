import { fakerEN_US as faker } from '@faker-js/faker';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { autocomplete, searchWord } from 'api/endpoints';
import { AxiosError } from 'axios';
import SearchResults from 'pages/SearchResults';
import { Route } from 'react-router-dom';
import { mockWord } from 'utils/mocks';
import { renderWithProviders } from 'utils/tests';

const search = 'new-search';

const word0 = faker.word.noun();
const word1 = faker.word.noun();
const word2 = faker.word.noun();
const word3 = faker.word.noun();
const word4 = faker.word.noun();

const result = mockWord();

const routes = (
    <>
        <Route path="/search" element={<SearchResults />} />
    </>
);

jest.mock('api/endpoints', () => ({
    autocomplete: jest.fn(),
    searchWord: jest.fn(),
}));

it('should display search result', async () => {
    (autocomplete as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            data: [],
        })
    );

    (searchWord as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            data: result,
        })
    );

    await act(async () => {
        renderWithProviders(routes, {
            initialEntries: ['/search?q=search'],
        });
    });

    const searchParams = new URLSearchParams();

    searchParams.set('query', 'search');

    expect(searchWord).toBeCalledTimes(1);
    expect(searchWord).toBeCalledWith(searchParams);

    const word = screen.getByTestId('word');
    expect(word).toBeInTheDocument();
    expect(word).toHaveTextContent(result.word);

    const meaning0 = screen.getByTestId('meaning-0');
    expect(meaning0).toBeInTheDocument();
    expect(meaning0).toHaveTextContent(result.meanings[0].text);

    const meaning1 = screen.getByTestId('meaning-1');
    expect(meaning1).toBeInTheDocument();
    expect(meaning1).toHaveTextContent(result.meanings[1].text);

    const meaning2 = screen.getByTestId('meaning-2');
    expect(meaning2).toBeInTheDocument();
    expect(meaning2).toHaveTextContent(result.meanings[2].text);

    const searchBarInput = screen.getByTestId('search-bar-input');
    expect(searchBarInput).toBeInTheDocument();
    expect(searchBarInput).toHaveValue('search');
});

it('should display not found message', async () => {
    (autocomplete as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            data: [],
        })
    );

    (searchWord as jest.Mock).mockRejectedValue(new AxiosError());

    await act(async () => {
        renderWithProviders(routes, {
            initialEntries: ['/search?q=search'],
        });
    });

    const notFound = screen.getByTestId('not-found');
    expect(notFound).toBeInTheDocument();
});

it('should search another word', async () => {
    (autocomplete as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            data: [word0, word1, word2, word3, word4],
        })
    );

    (searchWord as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            data: result,
        })
    );

    await act(async () => {
        renderWithProviders(routes, {
            initialEntries: ['/search?q=search'],
        });
    });

    const searchBarInput = screen.getByTestId('search-bar-input');
    await userEvent.clear(searchBarInput);
    await userEvent.type(searchBarInput, search);

    await userEvent.keyboard('{enter}');

    expect(autocomplete).toHaveBeenCalledTimes(12);

    const searchParams = new URLSearchParams();

    searchParams.set('query', search);

    expect(searchWord).toHaveBeenCalledTimes(2);
    expect(searchWord).toHaveBeenCalledWith(searchParams);
});
