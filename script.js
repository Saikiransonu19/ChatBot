import { GoogleGenerativeAI } from "@google/generative-ai";


const sendChatBtn = document.querySelector(".chat-input span i");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatBox");

   // Fetch your API_KEY
   const API_KEY = "AIzaSyCrFzU5vaQtjRA0ZaFOWmf8BnTTOJy0MrU";
 
   // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);

const HandleChat = () => {
    let userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTop = chatBox.scrollHeight;


   setTimeout(() => {
       const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatBox.appendChild(incomingChatLi);
        chatBox.scrollTop = chatBox.scrollHeight;


            generateReponse(userMessage).then(() => {
               incomingChatLi.textContent = incomingChatLi.textContent.replace("Thinking...", "");
   });
}, 500);

}

const createChatLi = (message, className) =>{
     const chatLi = document.createElement("li");
     chatLi.classList.add("chat", className);
     let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span><i class="fa-solid fa-robot"></i></span><p>${message}</p>`;
        chatLi.innerHTML = chatContent;
        return chatLi;
    
}


const generateReponse = async (message) => {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

            const prompt = message;
 
            const result = await model.generateContent(prompt);     

            const response = await result.response;

            const text = response.text();

            const formattedText = text.split('.').join('.<br>');

            document.querySelector(".chatBox").appendChild(createChatLi(formattedText, "incoming"));

            document.querySelector(".chatBox").scrollTop = document.querySelector(".chatBox").scrollHeight;


            chatBox.scrollBottom = chatBox.scrollHeight;
            
}

sendChatBtn.addEventListener("click", HandleChat);

chatInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        HandleChat();
    chatInput.value = "";
    }
});
