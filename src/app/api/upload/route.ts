import { auth } from '@clerk/nextjs/server';
import { createUploadConfig } from 'pushduck/server';

const { s3 } = createUploadConfig()
  .provider('aws', {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    region: process.env.AWS_S3_REGION!,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
  })
  .paths({
    prefix: 'uploads',
    generateKey: (file, metadata) => {
      const userId = (metadata as { userId?: string }).userId ?? 'anonymous';
      const timestamp = Date.now();
      return `${userId}/${timestamp}/${file.name}`;
    },
  })
  .build();

const uploadRouter = s3.createRouter({
  imageUpload: s3
    .image()
    .maxFileSize('4MB')
    .formats(['jpeg', 'jpg', 'png', 'gif', 'webp'])
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new Error('Unauthorized');
      return { userId };
    }),
  documentUpload: s3
    .file()
    .maxFileSize('16MB')
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new Error('Unauthorized');
      return { userId };
    }),
});

export type AppUploadRouter = typeof uploadRouter;

export const { GET, POST } = uploadRouter.handlers;
