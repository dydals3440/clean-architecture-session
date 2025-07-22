import type { PostEntity } from '@/features/post/domain/types/post.types';
import type { Reactions } from '@/features/post/domain/types/reaction.types';
import { PostTitle } from '@/features/post/domain/value-objects/PostTitle';

export class Post implements PostEntity {
  private _id: number;
  private _title: PostTitle;
  private _body: string;
  private _tags: string[];
  private _reactions: Reactions;
  private _views: number;
  private _userId: number;

  constructor(dto: PostEntity) {
    this._id = dto.id;
    this._title = new PostTitle(dto.title);
    this._body = dto.body;
    this._tags = dto.tags;
    this._reactions = dto.reactions;
    this._views = dto.views;
    this._userId = dto.userId;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title.value;
  }

  get body() {
    return this._body;
  }

  get tags() {
    return this._tags;
  }

  get reactions() {
    return this._reactions;
  }

  get views() {
    return this._views;
  }

  get userId() {
    return this._userId;
  }

  // 제목에 mother 라는 단어가 포함되어 있는지 확인하는 비즈니스 규칙
  hasMotherInTitle() {
    return this._title.hasMotherInTitle();
  }

  hasMatthewInTitle() {
    return this._title.hasMatthewInTitle();
  }
}
