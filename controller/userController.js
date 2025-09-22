import sql from "../config/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();  
    const creations = await sql`
      SELECT * FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;  
    // const user = await clerkClient.users.getUser(userId);
    res.json({ success: true, creations });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  } 
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations
      WHERE public = true
      ORDER BY created_at DESC
    `;  
    res.json({ success: true, creations });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  } 
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { creationId } = req.body;
    const { userId } = req.auth();

    const [creation] = await sql`
      SELECT * FROM creations
      WHERE id = ${creationId}
    `;

    if (!creation) {
      return res.json({ success: false, message: "Creation not found." });
    }

    const currentLikes = creation.likes || 0;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
        updatedLikes = currentLikes.filter(id => id !== userIdStr);
        message = "Creation Unliked.";
    } else {
        updatedLikes = [...currentLikes, userIdStr];
        message = "Creation Liked.";
    }

    const formatedArray = `{${updatedLikes.join(',')}}`;

    await sql`UPDATE creations SET likes = ${formatedArray}::text[] WHERE id = ${creationId}`;

    res.json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  } 
};

export const categoriesCount = async (req, res) => {
  try {
    const creation = await sql`
      SELECT type, COUNT(type) FROM creations GROUP BY type
    `;

    if (!creation) {
      return res.json({ success: false, message: "Creation not found." });
    }

    res.json({ success: true, counts: creation });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  } 
};
