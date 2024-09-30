import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#f8f9fa',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    boxShadow: 'none',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '32px',
                },
            },
        },
    },
});

export default theme;
