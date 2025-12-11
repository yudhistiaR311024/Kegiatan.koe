export interface BaseRepository<T, CreateDTO, UpdateDTO> {
  create(dto: CreateDTO): Promise<T>;
  update(id: string, dto: UpdateDTO): Promise<T>;
  delete(id: string): Promise<void>;
}
