import { Categoria } from './entities/categoria.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaService } from './service/categoria.service';
import { CategoriaController } from './controller/categoria.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [],
})
export class CategoriaModule {}