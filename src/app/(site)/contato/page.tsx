import { redirect } from "next/navigation";

/** Rota antiga — redireciona para Ouvidoria */
export default function ContatoRedirectPage() {
  redirect("/ouvidoria");
}
