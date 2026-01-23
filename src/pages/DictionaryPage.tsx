import { getDictionary } from '@/api/dictionary.api';
import Preloader from '@/components/Preloader';
import VerbProgress from '@/components/VerbProgress';
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
            <th>#</th>
            <th>Infinitive</th>
            <th>Past Simple</th>
            <th>Past Participle</th>
            <th>Перевод</th>
            <th>Прогресс</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(
            ({ id, base, past, pastParticiple, translation }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{base}</td>
                <td>{past}</td>
                <td>{pastParticiple}</td>
                <td>{translation}</td>
                <td>
                  <VerbProgress progress={progressMap[id]} />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DictionaryPage;
