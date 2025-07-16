import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Produtos } from './produtos/entities/produtos.entity';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_crudfarmacia',
      entities: [Categoria, Produtos],
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
    ProdutosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
