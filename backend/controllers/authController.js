import { db } from "../models/database.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check in midwife table
    const [adminResult] = await db.execute(
      "SELECT * FROM midwife WHERE last_name = ? AND first_name = ?",
      [username, password]
    );

    if (adminResult.length > 0) {
      return res.status(200).json({ success: true, role: "admin", user: adminResult[0] });
    }

    // Check in patient table
    const [userResult] = await db.execute(
      "SELECT * FROM patient WHERE first_name = ? AND last_name = ?",
      [username, password]
    );

    if (userResult.length > 0) {
      return res.status(200).json({ success: true, role: "user", user: userResult[0] });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};