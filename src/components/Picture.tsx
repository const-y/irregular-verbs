import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image } from 'react-bootstrap';
import { useStoreContext } from '../context/storeContext';

const Picture: React.FC = () => {
  const store = useStoreContext();

  const addImageFallback = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = `${process.env.PUBLIC_URL}/images/logo512.png`;
  };

  return (
    <picture>
      <Image
        src={`${process.env.PUBLIC_URL}/images/${store.firstDictionaryItem[0]}.webp`}
        onError={addImageFallback}
        rounded
        height={400}
      />
    </picture>
  );
};

export default observer(Picture);
