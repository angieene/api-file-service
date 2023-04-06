import { FilePermissionEnum } from 'src/core/enums';

export class ShareFileDto {
  isPublic: boolean;
  size: number;
  name: string;
  email: string;
  permissions: FilePermissionEnum;
}
