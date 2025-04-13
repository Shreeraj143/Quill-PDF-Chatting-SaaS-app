import { db } from "@/db";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const user = await currentUser();

  if (!user?.id) return new Response("Unauthorized", { status: 401 });

  const { fileId, message } = SendMessageValidator.parse(body);

  const file = db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });

  if (!file) return new Response("Not Found", { status: 404 });

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId: user.id,
      fileId,
    },
  });
};
