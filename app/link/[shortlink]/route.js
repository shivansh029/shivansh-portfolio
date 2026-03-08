import { redirect } from "next/navigation";
import { SHORTLINKS } from "../../../utils/links";

export async function GET(request, { params }) {
  const { shortlink } = params;

  if (!shortlink) {
    return new Response("No shortlink provided", { status: 400 });
  }

  const target = SHORTLINKS[shortlink.toLowerCase()];

  if (!target) {
    return redirect("/");
  }

  return redirect(target);
}
