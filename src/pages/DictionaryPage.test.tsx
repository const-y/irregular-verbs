import { verbsStub } from '@/api/__stubs__/dictionary.stub';
import * as dictionaryApi from '@/api/dictionary.api';
import { render } from '@/test/test-uitls';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import DictionaryPage from './DictionaryPage';

vi.mock('@/api/dictionary.api');

describe('DictionaryPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('отображает список слов', async () => {
    vi.mocked(dictionaryApi.getDictionary).mockResolvedValue(verbsStub());

    const page = await render(<DictionaryPage />);

    await expect.element(page.getByTestId('preloader')).toBeInTheDocument();
    await expect.element(page.getByRole('table')).toBeInTheDocument();
  });
});
