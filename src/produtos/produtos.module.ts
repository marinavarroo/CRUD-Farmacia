import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categoria/categoria.module';
import { ProdutosController } from './entities/controller/produtos.controller';
import { Produtos } from './entities/produtos.entity';
import { ProdutosService } from './service/produtos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produtos]), CategoriaModule],
  providers: [ProdutosService],
  controllers: [ProdutosController],
  exports: [],
})
export class ProdutosModule {}
