import { ValueObject } from '@/shared/domain/ValueObject';

export class PostTitle extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('제목은 비어있을 수 없습니다.');
    }

    if (value.length > 100) {
      throw new Error('제목은 100자를 초과할 수 없습니다.');
    }

    if (value.length < 1) {
      throw new Error('제목은 최소 1자 이상이어야 합니다.');
    }
  }

  public hasMotherInTitle(): boolean {
    return this._value.toLowerCase().includes('mother');
  }

  public hasMatthewInTitle(): boolean {
    return this._value.toLowerCase().includes('matthew');
  }

  public getLength(): number {
    return this._value.length;
  }

  public toString(): string {
    return this._value;
  }
}
