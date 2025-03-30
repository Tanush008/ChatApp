import { Chat } from "../models/chatModels";

export const archiveChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.id;

        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ message: "Chat not found" });

        if (!chat.members.includes(userId))
            return res.status(403).json({ message: "You are not a member of this chat" });

        if (!chat.archivedBy.includes(userId)) {
            chat.archivedBy.push(userId);
            await chat.save();
        }

        return res.status(200).json({ message: "Chat archived for you" });

    } catch (error) {
        console.error("Archive error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const unarchiveChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.id;

        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ message: "Chat not found" });

        chat.archivedBy = chat.archivedBy.filter(id => id.toString() !== userId);
        await chat.save();

        return res.status(200).json({ message: "Chat unarchived for you" });

    } catch (error) {
        console.error("Unarchive error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}