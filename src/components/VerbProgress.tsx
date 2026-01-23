import { type Progress } from '@/storage/progress.storage';
import type { FC } from 'react';
import { ProgressBar } from 'react-bootstrap';

interface VerbProgressProps {
  progress?: Progress;
}

const VerbProgress: FC<VerbProgressProps> = ({ progress }) => {
  const strength = progress?.strength ?? 0;

  return (
    <ProgressBar
      now={strengthToPercent(strength)}
      variant={strengthToVariant(strength)}
    />
  );
};

function strengthToPercent(strength: number) {
  return Math.round(strength * 100);
}

function strengthToVariant(strength: number) {
  if (strength < 0.3) return 'danger';
  if (strength < 0.7) return 'warning';
  return 'success';
}

export default VerbProgress;
