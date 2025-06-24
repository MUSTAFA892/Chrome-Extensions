const sendBtn = document.getElementById("sendBtn");
const output = document.getElementById("responseOutput");
const input = document.getElementById("userInput");
const mainContainer = document.getElementById("mainContainer");
const closeBtn = document.getElementById("closeBtn");

const API_KEY = "Your_API_Key_Here";
const STORAGE_KEY = "chatHistory";

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;

let chatHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
}

function formatReply(text) {
  text = text.replace(/```([\s\S]*?)```/g, (match, codeContent) => {
    const code = codeContent;
    return `<div class="code-block relative"><button class="copy-btn absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded">Copy</button><pre class="bg-gray-200 text-black p-3 rounded mt-2 overflow-x-auto whitespace-pre-wrap"><code>${code}</code></pre></div>`;
  });

  text = text.replace(/`([^`]+)`/g, "<code class='bg-gray-200 text-black px-1 rounded'>$1</code>");
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-gray-300'>$1</strong>");
  text = text.replace(/^# (.*$)/gim, "<h2 class='text-lg text-gray-300 mt-4 mb-2'>$1</h2>");
  text = text.replace(/^## (.*$)/gim, "<h3 class='text-md text-gray-200 mt-3 mb-1'>$1</h3>");

  return text.replace(/\n/g, "<br>");
}

mainContainer.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDragging);

function startDragging(e) {
  initialX = e.clientX - currentX;
  initialY = e.clientY - currentY;
  isDragging = true;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    mainContainer.style.left = currentX + "px";
    mainContainer.style.top = currentY + "px";
    mainContainer.style.position = "absolute";
  }
}

function stopDragging() {
  isDragging = false;
}

sendBtn.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatHistory.push({ user: userMessage, response: "<i>Gemini is thinking...</i>" });
  output.innerHTML = chatHistory.map(msg => `<div>${msg.user}<br>${msg.response}</div>`).join("<hr class='my-2 border-gray-600'>");
  saveToStorage();

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userMessage }] }]
      })
    });

    const data = await res.json();
    console.log("Gemini response:", data);

    let reply = "No response.";
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      reply = data.candidates[0].content.parts[0].text;
    } else if (data.error?.message) {
      reply = "Error: " + data.error.message;
    }

    const formattedReply = formatReply(reply);
    chatHistory[chatHistory.length - 1].response = formattedReply;
    output.innerHTML = chatHistory.map(msg => `<div>${msg.user}<br>${msg.response}</div>`).join("<hr class='my-2 border-gray-600'>");
    saveToStorage();
  } catch (err) {
    console.error("Fetch error:", err);
    chatHistory[chatHistory.length - 1].response = "Could not connect to Gemini.";
    output.innerHTML = chatHistory.map(msg => `<div>${msg.user}<br>${msg.response}</div>`).join("<hr class='my-2 border-gray-600'>");
    saveToStorage();
  }
});

output.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const preElement = e.target.nextElementSibling;
    const code = preElement.textContent.trim();
    navigator.clipboard.writeText(code).then(() => {
      e.target.textContent = "Copied!";
      setTimeout(() => (e.target.textContent = "Copy"), 2000);
    });
  }
});

closeBtn.addEventListener("click", () => {
  window.close();
});

document.addEventListener("click", (e) => {
  if (!mainContainer.contains(e.target) && e.target !== closeBtn) {
    e.preventDefault();
  }
});

window.onload = () => {
  if (chatHistory.length) {
    output.innerHTML = chatHistory.map(msg => `<div>${msg.user}<br>${msg.response}</div>`).join("<hr class='my-2 border-gray-600'>");
  }
  mainContainer.style.position = "absolute";
  currentX = mainContainer.offsetLeft;
  currentY = mainContainer.offsetTop;
};

// Add Enter key event listener
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Prevent adding a new line
    sendBtn.click();
    input.value = "";
  }
});
