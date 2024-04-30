import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    if (!req.body || !req.body.id || !req.body.status) {
      return res
        .status(400)
        .json({ error: "Missing id or status in request body" });
    }
    const { id, todo, status } = req.body;
    try {
      const result = await sql`
        UPDATE todos_ppqita SET status = ${status}, todo = ${todo} WHERE id = ${id} RETURNING *`;
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating todo:", error.message);
      res.status(500).json({ error: "Error updating todo" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
