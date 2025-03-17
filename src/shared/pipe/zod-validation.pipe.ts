import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const parsedValud = this.schema.parse(value);
      return parsedValud;
    } catch (error) {
      throw new BadRequestException(error.errors);
    }
  }
}
