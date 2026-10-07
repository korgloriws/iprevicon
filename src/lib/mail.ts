import nodemailer from "nodemailer";

/** Envia e-mail se SMTP estiver configurado. Retorna false se pulado/falhou. */
export async function sendOuvidoriaEmail(opts: {
  subject: string;
  text: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const to = process.env.OUVIDORIA_EMAIL || "ouvidoria@iprevicon.contagem.mg.gov.br";
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const from = process.env.SMTP_FROM || user || to;

  if (!host || !user || !pass) {
    return { sent: false, reason: "smtp_not_configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject: opts.subject,
      text: opts.text,
    });
    return { sent: true };
  } catch (error) {
    console.error("[mail] falha ao enviar para ouvidoria:", error);
    return { sent: false, reason: "smtp_error" };
  }
}
