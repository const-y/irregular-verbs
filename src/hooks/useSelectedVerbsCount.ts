import { getDictionary } from '@/api/dictionary.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useStore } from '@/context/storeContext';
import { useQuery } from '@tanstack/react-query';

const useSelectedVerbsCount = () => {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.dictionary,
    queryFn: getDictionary,
  });

  const { settingsStore } = useStore();
  const loadedCount = data?.length ?? 0;

  return Math.max(loadedCount - settingsStore.disabledVerbs.size, 0);
};

export default useSelectedVerbsCount;
