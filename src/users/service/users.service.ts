import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserDTO) {
    const emailInUse = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailInUse) throw new Error('Email in use!');

    const user = this.prisma.user.create({
      data,
    });

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UserDTO) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
