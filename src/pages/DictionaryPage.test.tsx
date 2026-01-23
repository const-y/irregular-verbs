import { render } from '@/test/test-uitls';
import { describe, it, vi } from 'vitest';
import DictionaryPage from './DictionaryPage';
import { expect } from 'vitest';
import * as dictionaryApi from '@/api/dictionary.api';
import { verbsStub } from '@/api/__stubs__/dictionary.stub';

vi.mock('@/api/dictionary.api');

describe('DictionaryPage', () => {
  it('отображает список слов', async () => {
    vi.mocked(dictionaryApi.getDictionary).mockResolvedValue(verbsStub());

    const page = await render(<DictionaryPage />);

    await expect.element(page.getByTestId('preloader')).toBeInTheDocument();
    await expect.element(page.getByRole('table')).toBeInTheDocument();
  });
});
