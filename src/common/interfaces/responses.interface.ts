import { Sample } from './models.interface';

export interface SampleResponse extends Sample {
  cropped_image_url: string;
  client_uuid: string;
  testable_uuid: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken?: string;
}
