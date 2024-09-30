import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import SearchResults from 'pages/SearchResults';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Search />,
    },
    {
        path: '/search',
        element: <SearchResults />,
    },
]);

export default router;
