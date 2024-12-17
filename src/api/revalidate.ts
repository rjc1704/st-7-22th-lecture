"use server";
import { revalidatePath, revalidateTag } from "next/cache";

type RevalidateOptions =
  | { type: "path"; path: string; kind: "page" | "layout" }
  | { type: "tag"; tag: string };

/**
 * revalidate 함수: 매개변수에 따라 revalidatePath 또는 revalidateTag 실행
 * @param options - revalidation 옵션 (path 또는 tag)
 */
export const revalidate = (options: RevalidateOptions): void => {
  if (options.type === "path") {
    // revalidatePath 호출
    revalidatePath(options.path, options.kind);
  } else if (options.type === "tag") {
    // revalidateTag 호출
    revalidateTag(options.tag);
  }
};
