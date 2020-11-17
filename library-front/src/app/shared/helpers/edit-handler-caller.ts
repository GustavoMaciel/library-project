export interface EditHandlerCaller {
  preInsert(): void;
  preUpdate(): void;
  postGetItem(): void;
  postUpdate(): void;
  postInsert(): void;
}
