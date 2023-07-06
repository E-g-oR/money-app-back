import { Depth } from "@prisma/client";
import { pipe } from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray";
import * as N from "fp-ts/number";
import * as D from "fp-ts/Date";
import { contramap, reverse } from "fp-ts/Ord";

const byValueNeedToCover = pipe(
  N.Ord,
  contramap((dept: Depth) => dept.value - dept.valueCovered),
  reverse,
);

const byDeadline = pipe(
  D.Ord,
  contramap((dept: Depth) => dept.deadline),
);

export const sortDepts = (depts: ReadonlyArray<Depth>) =>
  pipe(depts, A.sortBy([byValueNeedToCover, byDeadline]));
