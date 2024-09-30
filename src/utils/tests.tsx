import { ThemeProvider } from '@mui/material';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import {
    createMemoryRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import theme from 'theme';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    initialEntries?: string[];
}

export function renderWithProviders(
    ui: ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    const { initialEntries = [], ...renderOptions } = extendedRenderOptions;

    const Wrapper = ({ children }: PropsWithChildren) => {
        const router = createMemoryRouter(createRoutesFromElements(children), {
            initialEntries,
        });

        return (
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        );
    };

    return {
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}
