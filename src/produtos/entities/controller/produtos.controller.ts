import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Produtos } from '../produtos.entity';
import { ProdutosService } from '../../service/produtos.service';

@Controller('/produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produtos[]> {
    return this.produtosService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produtos> {
    return this.produtosService.findById(id);
  }

  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByTNome(@Param('nome') nome: string): Promise<Produtos[]> {
    return this.produtosService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produtos): Promise<Produtos> {
    return this.produtosService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produtos): Promise<Produtos> {
    return this.produtosService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.produtosService.delete(id);
  }
}
