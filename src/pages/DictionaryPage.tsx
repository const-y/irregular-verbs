import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import { getDictionary } from '@/api/dictionary.api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import Preloader from '@/components/Preloader';

const DictionaryPage: React.FC = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.dictionary,
    queryFn: getDictionary,
  });

  if (query.isLoading) {
    return <Preloader />;
  }

  if (query.isError) {
    return <Alert variant="danger">{query.error.message}</Alert>;
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
          </tr>
        </thead>
        <tbody>
          {query.data?.map(
            ({ id, base, past, pastParticiple, translation }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{base}</td>
                <td>{past}</td>
                <td>{pastParticiple}</td>
                <td>{translation}</td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DictionaryPage;
