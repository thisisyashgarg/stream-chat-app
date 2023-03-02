import { FastifyInstance } from "fastify";
import { StreamChat } from "stream-chat";

const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_SECRET_KEY!
);

export const userRoutes = async (app: FastifyInstance) => {
  app.post<{ Body: { id: string; name: string; image?: string } }>(
    "/signup",
    async (req, res) => {
      const { id, name, image } = req.body;
      if (id === null || id === "" || name === null || name === "") {
        return res.status(404).send("");
      }

      //check for existing user
      const existingUsers = await streamChat.queryUsers({ id });
      if (existingUsers.users.length > 0) {
        return res.status(400).send("User ID is taken");
      }
      await streamChat.upsertUser({ id, name, image });
    }
  );

  app.post<{ Body: { id: string } }>("/login", async (req, res) => {
    const { id } = req.body;
    if (id === null || id === "") {
      return res.status(404).send("");
    }

    const {
      users: [user],
    } = await streamChat.queryUsers({ id });
    if (user == null) return res.status(400).send("Invalid User");

    const token = streamChat.createToken(id);
    return {
      token,
      user: { name: user.name, id: user.id, image: user.image },
    };
  });
};
