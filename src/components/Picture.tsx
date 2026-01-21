import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image } from 'react-bootstrap';
import { useStoreContext } from '@/context/storeContext';

const Picture: React.FC = () => {
  const store = useStoreContext();

  const addImageFallback = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/images/uk-flag.svg';
  };

  return (
    <picture>
      <Image
        src={`/images/${store.firstDictionaryItem.base}.webp`}
        onError={addImageFallback}
        rounded
        height={250}
      />
    </picture>
  );
};

export default observer(Picture);
