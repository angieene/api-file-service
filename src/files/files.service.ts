import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
