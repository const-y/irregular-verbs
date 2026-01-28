import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image } from 'react-bootstrap';
import { useStore } from '@/context/storeContext';

const Picture: React.FC = () => {
  const { testStore } = useStore();

  const addImageFallback = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = `${import.meta.env.BASE_URL}/images/uk-flag.svg`;
  };

  if (!testStore.activeVerb) {
    return null;
  }

  return (
    <Image
      src={`${import.meta.env.BASE_URL}images/${testStore.activeVerb.base}.webp`}
      onError={addImageFallback}
      rounded
      height={250}
    />
  );
};

export default observer(Picture);
