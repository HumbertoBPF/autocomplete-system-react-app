import { act, screen } from '@testing-library/react';
import { autocomplete } from 'api/endpoints';
import { fakerEN_US as faker } from '@faker-js/faker';
import Search from 'pages/Search';
import { Route } from 'react-router-dom';
import { renderWithProviders } from 'utils/tests';
import userEvent from '@testing-library/user-event';

const search = 'search';

const word0 = faker.word.noun();
const word1 = faker.word.noun();
const word2 = faker.word.noun();
const word3 = faker.word.noun();
const word4 = faker.word.noun();

const routes = (
    <>
        <Route path="/" element={<Search />} />
        <Route
            path="/search"
            element={<h1 data-testid="search-results">Search results</h1>}
        />
    </>
);

jest.mock('api/endpoints', () => ({
    autocomplete: jest.fn(),
}));

it('should autocomplete what the user types and redirect', async () => {
    (autocomplete as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            data: [word0, word1, word2, word3, word4],
        })
    );

    await act(async () => {
        renderWithProviders(routes, {
            initialEntries: ['/'],
        });
    });

    const searchBarInput = screen.getByTestId('search-bar-input');
    await userEvent.type(searchBarInput, search);

    const submitButton = screen.getByTestId('submit-button');
    await userEvent.click(submitButton);

    expect(autocomplete).toHaveBeenCalledTimes(6);

    const searchResults = screen.getByTestId('search-results');
    expect(searchResults).toBeInTheDocument();
});
