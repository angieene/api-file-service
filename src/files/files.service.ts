import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPositiveRequest } from 'src/core/types/main';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async addFile(file: Express.Multer.File): Promise<IPositiveRequest> {
    const { originalname, mimetype, path, buffer, size } = file;

    const newFile = this.fileRepository.create();

    if (!newFile) {
      throw new BadRequestException('Couldn`t create file');
    }

    newFile.name = originalname;
    newFile.mimetype = mimetype;
    newFile.size = size;
    newFile.path = path;
    newFile.buffer = buffer;

    const savedFile = await this.fileRepository.save(newFile);

    if (!savedFile) {
      throw new BadRequestException('Couldn`t save file');
    }

    return { success: true };
  }

  async findOneById(fileId: string): Promise<FileEntity> {
    const car = await this.fileRepository.findOne({ where: { id: fileId } });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return car;
  }

  // async addImage(carId: string, file: Express.Multer.File) {
  //   const car = await this.findOneById(fileId);

  //   if (car.images.length === 8) {
  //     throw new BadRequestException('You can add only 8 images');
  //   }

  //   if (file) {
  //     car.images.push(
  //       await this.fileService.uploadImageFile(file, API_URL.upload),
  //     );
  //   }

  //   await this.fileRepository.save(car);

  //   return { success: true };
  // }

  // async getFileById(id: string): Promise<FileEntity> {
  //   return await this.fileRepository.findOne({ id: id });
  // }

  // async deleteFileById(id: string): Promise<IPositiveRequest> {
  //   await this.fileRepository.delete(id);
  //   return { success: true };
  // }
}
