// src/data/chatSuggestions.js

export const ALL_SUGGESTIONS = [
  "Birthday ke liye best cake?",
  "Chocolate cake kitna hai?",
  "Custom cake ban sakta hai?",
  "Delivery hoti hai?",
  "Hazelnut cake kaisa hai?",
  "Sabse sasta cake?",
  "Ice cake kya hota hai?",
  "Order kaise karein?",
  "Oreo cake available hai?",
  "Vanilla cake price?",
];

// Random suggestions — original array mutate nahi hota
export const getRandomSuggestions = (count = 4) =>
  [...ALL_SUGGESTIONS].sort(() => Math.random() - 0.5).slice(0, count);

export const WELCOME_MESSAGES = [
  "Assalam o Alaikum! 🎂 Cakes Villa mein khush amdeed! Koi bhi cake ke baare mein poochh sakte hain.",
  "Hello! 👋 Looking for the perfect cake? I'm here to help you find it!",
  "Salam! 🍰 Aaj kaunsa cake try karein? Main aap ki madad kar sakta hoon!",
  "Hi there! 🎉 Special occasion ke liye cake dhundh rahe hain? Batayein!",
  "Assalam o Alaikum! ✨ Fresh baked cakes, custom orders — kya chahiye aapko?",
  "Welcome to Cakes Villa! 🎂 Chocolate, Hazelnut, Vanilla — kaunsa flavour pasand hai?",
];

export const getRandomWelcome = () =>
  WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];

export const SYSTEM_PROMPT = `You are a friendly assistant for Cakes Villa, a premium cake shop in Karachi, Pakistan.

About Cakes Villa:
- We bake fresh cakes daily using premium local ingredients
- Categories: Chocolate Cake, Hazelnut Cake, Vanilla Cake, Ice Cake, Oreo Cake
- Prices range from Rs. 200 to Rs. 5,400
- We offer home delivery and custom cake orders
- Phone: +923110250787 | Email: cakesvilla@gmail.com
- Instagram: @cakes_villa002

Your job:
- Help customers find the right cake for their occasion
- Answer questions about flavours, prices, delivery and custom orders
- Be warm, concise and helpful — like a friendly bakery staff member
- If asked about a specific price or availability, suggest they call or message us directly
- Always reply in the same language the customer uses (Urdu or English)
- Keep replies short (2-4 sentences max)

Do NOT:
- Make up prices that are not listed above
- Promise specific delivery times
- Handle complaints — direct them to our phone number`;