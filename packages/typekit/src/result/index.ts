export * as Result from "./implementation";
export {
  ok,
  err,
  isOk,
  isErr,
  map,
  mapErr,
  bimap,
  flatMap,
  flatMapErr as flatMapError,
  biFlatMap,
} from "./implementation";
