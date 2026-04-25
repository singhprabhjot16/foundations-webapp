import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store';
import Router from './routes/Router';
import ThemeProvider from './theme';
import ErrorBoundary from './components/common/ErrorBoundary';

/**
 * App - Root application component
 * @component
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
