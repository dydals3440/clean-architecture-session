import { Post } from '@/features/post/domain/models/Post';
import type { PostEntity } from '@/features/post/domain/types/post.types';
import type { PostDto as PostDto } from '@/features/post/infrastructure/dto/post.dto';

export class PostMapper {
  static toDto(post: Post): PostDto {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      tags: post.tags,
      reactions: post.reactions,
      views: post.views,
      userId: post.userId,
    };
  }

  static toDomain(dto: PostDto): Post {
    return new Post({
      id: dto.id,
      title: dto.title,
      body: dto.body,
      tags: dto.tags,
      reactions: dto.reactions,
      views: dto.views,
      userId: dto.userId,
    });
  }

  static fromEntity(entity: PostEntity): Post {
    return new Post({
      id: entity.id,
      title: entity.title,
      body: entity.body,
      tags: entity.tags,
      reactions: entity.reactions,
      views: entity.views,
      userId: entity.userId,
    });
  }

  static toDomainList(dtos: PostDto[]): Post[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  static fromEntityList(entities: PostEntity[]): Post[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  static toDtoList(posts: Post[]): PostDto[] {
    return posts.map((post) => this.toDto(post));
  }
}
