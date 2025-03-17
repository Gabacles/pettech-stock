import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './repositories/product.repository';
import { ProductMongooseRepository } from './repositories/mongoose/product.mongoose.repository';
import { StockService } from './services/stock.service';
import { StockController } from './controllers/stock.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductMongooseRepository,
    },
    StockService,
  ],
  controllers: [StockController],
})
export class StockModule {}
