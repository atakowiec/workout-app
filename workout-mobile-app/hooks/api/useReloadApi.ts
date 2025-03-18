import { ReloadApiContext } from './ReloadApiContext';
import { useContext } from 'react';

export function useReloadApi() {
  const context = useContext(ReloadApiContext);

  return context!.reloadApi;
}