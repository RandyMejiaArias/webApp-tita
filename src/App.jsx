import { AppRouter } from "./router/AppRouter";
import { AppTheme } from './theme/AppTheme';

export const NextSnkrApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
}