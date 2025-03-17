import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';

const createStockSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  relationId: z.string(),
});

const updateStockSchema = z.object({
  stock: z.coerce.number(),
});

type CreateStockSchema = z.infer<typeof createStockSchema>;
type UpdateStockSchema = z.infer<typeof updateStockSchema>;

@UseInterceptors(LoggingInterceptor)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllStock(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.stockService.getAllStock(limit, page);
  }

  @Get('/:productId')
  async getStockById(@Param('productId') productId: string) {
    return this.stockService.getStockById(productId);
  }

  @UsePipes(new ZodValidationPipe(createStockSchema))
  @Post()
  async createStock(@Body() product: CreateStockSchema) {
    return this.stockService.createStock(product);
  }

  @Put('/:productId')
  async updateStock(
    @Param('productId') productId: string,
    @Body(new ZodValidationPipe(updateStockSchema))
    { stock }: UpdateStockSchema,
  ) {
    return this.stockService.updateStock(productId, stock);
  }

  @Delete('/:productId')
  async deleteStock(@Param('productId') productId: string) {
    return this.stockService.deleteStock(productId);
  }
}
