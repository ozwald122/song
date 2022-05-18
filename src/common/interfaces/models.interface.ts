export interface Sample {
  sample_id: string;
  timestamp: string;
  indexes: number[];
  colors: Array<number[]>;
  color_scales: Array<Array<number[]>>;
}
