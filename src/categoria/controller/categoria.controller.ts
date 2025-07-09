import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../entities/categoria.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

@Controller('/categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
}

@Get('nome/:nome')
@HttpCode(HttpStatus.OK)
findAllByNome(@Param('nome') nome: string): Promise<Categoria[]> {
    return this.categoriaService.findAllByNome(nome);
}

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
}

@Put()
@HttpCode(HttpStatus.OK)
update(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
}

@Delete('/:id')
@HttpCode(HttpStatus.OK)
async delete(@Param('id', ParseIntPipe) id: number) {
    await this.categoriaService.delete(id);
    return { message: `Categoria ${id} deletada com sucesso 😊` };

}
}