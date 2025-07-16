import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { Produtos } from '../entities/produtos.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produtos)
    private produtosRepository: Repository<Produtos>,

    private readonly categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produtos[]> {
    return await this.produtosRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produtos> {
    const postagem = await this.produtosRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!postagem) {
      throw new HttpException(
        'Postagem não encontrada 😢',
        HttpStatus.NOT_FOUND,
      );
    }
    return postagem;
  }

  async findAllByNome(nome: string): Promise<Produtos[]> {
    const titulo = await this.produtosRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });

    if (titulo.length === 0) {
      throw new HttpException(
        'Produto não encontrado 😢',
        HttpStatus.NOT_FOUND,
      );
    }

    return titulo;
  }

  async create(produto: Produtos): Promise<Produtos> {
    await this.categoriaService.findById(produto.categoria.id); // Validação da existência da categoria
    return await this.produtosRepository.save(produto);
  }

  async update(produto: Produtos): Promise<Produtos> {
    await this.findById(produto.id);
    return await this.produtosRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); // Garante que o produto existe antes de deletar
    return await this.produtosRepository.delete(id);
  }
}
