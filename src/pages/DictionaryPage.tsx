import React from 'react';
import { Table } from 'react-bootstrap';
import { useStoreContext } from '../context/storeContext';
import { observer } from 'mobx-react-lite';

const DictionaryPage: React.FC = () => {
  const store = useStoreContext();

  return (
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
        {store.dictionary.map(
          ([infinitive, past, participle, translation], index) => (
            <tr key={infinitive}>
              <td>{index + 1}</td>
              <td>{infinitive}</td>
              <td>{past}</td>
              <td>{participle}</td>
              <td>{translation}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default observer(DictionaryPage);
