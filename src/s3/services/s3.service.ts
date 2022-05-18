import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private s3: S3;
  constructor() {
    this.s3 = this.getS3();
  }
  async uploadFile(
    file: File | Buffer,
    name: string,
    bucket = process.env.S3_BUCKET,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    const result = await this.s3.upload(params).promise();
    return {
      Key: result.Key,
      Location: result.Location,
      Etag: result.ETag,
    };
  }

  getObject(key: string, bucket = process.env.S3_BUCKET) {
    const params = {
      Key: key,
      Bucket: bucket,
    };
    return this.s3.getObject(params);
  }

  getS3(): S3 {
    return new S3({
      accessKeyId: process.env.S3_ACCESS_ID,
      secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
      region: process.env.S3_REGION,
    });
  }
}
