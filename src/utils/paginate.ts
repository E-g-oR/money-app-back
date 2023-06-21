import { pipe } from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray";
import { Pageable } from "../types/pageable";

export const paginate = <D>(
  data: ReadonlyArray<D>,
  limit: number,
): ReadonlyArray<Pageable<D>> =>
  pipe(
    data,
    A.chunksOf(limit),
    A.mapWithIndex<ReadonlyArray<D>, Pageable<D>>((index, item) => ({
      data: item,
      meta: {
        limit,
        page: index + 1,
        pageCount: Math.floor(data.length / limit),
        count: item.length,
      },
    })),
  );
