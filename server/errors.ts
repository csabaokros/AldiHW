import type { H3Error } from "h3";

export default function (statusCode: number, statusMessage?: string): H3Error {
  return createError({
    statusCode,
    statusMessage: statusMessage || "An error occured",
  });
}
