import { API_CONFIG } from '../config/api.config';
import { Verb } from '../types/verb';

export const getDictionary = async (): Promise<Verb[]> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/verbs`);
  const data = await response.json();
  return data;
};
