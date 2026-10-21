import API from "./api";

export const sendChatMessage = async (messages) => {
  try {
    const { data } = await API.post("/chat", {
      messages: messages.map(({ role, content }) => ({ role, content })),
    });
    return data.reply || "Sorry, I couldn't respond. Please try again.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Oops! Something went wrong. Please try again or call us at +923110250787.";
  }
};