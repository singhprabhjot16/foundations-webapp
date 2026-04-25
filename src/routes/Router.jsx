import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import { ROUTES } from './Path';
import LoadingScreen from '../components/common/LoadingScreen';

/**
 * Loadable - HOC for lazy loading with LoadingScreen fallback
 * @param {React.ComponentType} Component
 * @returns {React.ComponentType}
 */
function Loadable(Component) {
  function WrappedComponent(props) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  }
  return WrappedComponent;
}

// Lazy load all pages
const Splash = Loadable(lazy(() => import('../pages/Splash/Splash')));
const Home = Loadable(lazy(() => import('../pages/Home/Home')));
const QuizConfig = Loadable(lazy(() => import('../pages/QuizConfig/QuizConfig')));
const Countdown = Loadable(lazy(() => import('../pages/Countdown/Countdown')));
const Quiz = Loadable(lazy(() => import('../pages/Quiz/Quiz')));
const Results = Loadable(lazy(() => import('../pages/Results/Results')));
const PastQuizzes = Loadable(lazy(() => import('../pages/PastQuizzes/PastQuizzes')));
const NotFound = Loadable(lazy(() => import('../pages/NotFound/NotFound')));

/**
 * Router - Main routing configuration (no auth guards — app is public)
 * @component
 * @returns {JSX.Element}
 */
const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.SPLASH} element={<Splash />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.QUIZ_CONFIG} element={<QuizConfig />} />
      <Route path={ROUTES.COUNTDOWN} element={<Countdown />} />
      <Route path={ROUTES.QUIZ} element={<Quiz />} />
      <Route path={ROUTES.RESULTS} element={<Results />} />
      <Route path={ROUTES.PAST_QUIZZES} element={<PastQuizzes />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default Router;
