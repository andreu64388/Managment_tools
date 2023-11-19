import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routerConfig } from './router/router';
import { LoadingApp } from './componets';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider
    router={routerConfig}

/>
);