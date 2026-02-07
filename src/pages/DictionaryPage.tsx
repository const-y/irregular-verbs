import { getDictionary } from '@/api/dictionary.api';
import DictionaryTableRow from '@/components/DictionaryTableRow';
import Preloader from '@/components/Preloader';
import ToggleAllVerbs from '@/components/ToggleAllVerbs';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { loadProgress } from '@/storage/progress.storage';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { Alert, Table } from 'react-bootstrap';

const DictionaryPage: React.FC = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: QUERY_KEYS.dictionary,
    queryFn: getDictionary,
  });
  const progressMap = useMemo(() => loadProgress(), []);

  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="width-100 overflow-auto">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <ToggleAllVerbs dictionary={data} />
            </th>
            <th>Infinitive</th>
            <th>Past Simple</th>
            <th>Past Participle</th>
            <th>Перевод</th>
            <th>Прогресс</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((verb) => (
            <DictionaryTableRow
              key={verb.id}
              verb={verb}
              progress={progressMap[verb.id]}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DictionaryPage;
