# Gemini Chatbot Chrome Extension

Welcome to the **DSA Gemini Chatbot Chrome Extension**, a sophisticated browser extension leveraging the power of the Gemini API to provide an interactive Data Structures and Algorithms (DSA) assistance tool. This project is designed to assist developers, students, and enthusiasts by offering real-time explanations, code examples, and problem-solving support directly within the Chrome browser. Built with modern web technologies, this extension includes advanced features like a draggable interface, persistent chat history, and code copying functionality.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Development Guidelines](#development-guidelines)
- [API Integration](#api-integration)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

The DSA Gemini Chatbot Chrome Extension is a cutting-edge tool that integrates with the Gemini API to deliver AI-powered responses tailored to DSA queries. Whether you need help understanding algorithms, debugging code, or generating examples, this extension provides a seamless experience with a customizable and interactive user interface. The project emphasizes usability, security, and extensibility, making it a valuable asset for both personal and collaborative development.

This repository contains the complete source code, including HTML, CSS, and JavaScript files, along with a Manifest V3 configuration. The extension is designed to run in Chrome's developer mode, offering a foundation for further enhancements and community contributions.

---

## Features

- **Interactive Chat Interface**: Engage with the Gemini AI to ask DSA-related questions and receive formatted responses.
- **Draggable Window**: Move the popup window anywhere on the screen for optimal placement.
- **Persistent Chat History**: Store and retrieve conversation history using `localStorage`.
- **Code Formatting and Copying**: Display code blocks with syntax highlighting and a one-click copy feature.
- **Enter Key Support**: Send messages and clear the input field automatically with the "Enter" key.
- **Close-on-Demand**: The popup remains visible until explicitly closed with the "✖" button.
- **Responsive Design**: Optimized for various screen sizes with a clean, minimalist aesthetic.

---

## Technologies Used

- **HTML5**: Structuring the popup interface.
- **CSS3 & Tailwind CSS**: Styling with a modern, responsive design framework.
- **JavaScript (ES6+)**: Core logic, event handling, and API integration.
- **Chrome Extensions API**: Manifest V3, `chrome.storage`, and popup management.
- **Gemini API**: Powered by Google's generative AI for natural language processing.
- **localStorage**: For persistent storage of chat history.

---

## Installation

### Prerequisites
- Google Chrome browser (version 88 or later recommended).
- A valid Gemini API key (obtainable from the Google Cloud Console).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/dsa-gemini-chatbot.git
   cd dsa-gemini-chatbot
   ```

2. **Configure the API Key**:
   - Open `popup.js` and replace the hardcoded `API_KEY` value with your Gemini API key:
     ```javascript
     const API_KEY = "your-gemini-api-key-here";
     ```
   - Alternatively, use `chrome.storage.local` for a more secure approach (see [API Integration](#api-integration)).

3. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" using the toggle in the top-right corner.
   - Click "Load unpacked" and select the project directory.
   - The extension should appear in your Chrome toolbar.

4. **Verify Installation**:
   - Click the extension icon to open the popup.
   - Type a DSA query (e.g., "Explain binary search") and press "Enter" to test.

---

## Usage

1. **Open the Chatbot**:
   - Click the extension icon in the Chrome toolbar to launch the popup.

2. **Interact with Gemini**:
   - Enter a DSA-related question or command in the textarea (e.g., "Write a Python function for bubble sort").
   - Press "Enter" to send the message and clear the input, or click the "Send" button.

3. **View Responses**:
   - Responses will appear in the output area, with code blocks formatted for readability and a "Copy" button for code snippets.

4. **Drag and Manage**:
   - Click and drag the popup to reposition it.
   - Click the "✖" button to close the popup.

5. **Review History**:
   - Chat history persists across sessions via `localStorage` and is displayed on reload.

---

## Development Guidelines

### Coding Standards
- Use ES6+ JavaScript syntax.
- Follow consistent indentation (2 spaces).
- Comment complex logic for clarity.

### Testing
- Test in Chrome's developer mode with the latest stable version.
- Use the Chrome DevTools console to debug errors.

### Building
- No build step is required; the project uses plain HTML, CSS, and JS files.
- Ensure all files are in the root directory as per the [File Structure](#file-structure).

---

## API Integration

The extension relies on the Gemini API for AI-powered responses. To integrate:

1. **Obtain an API Key**:
   - Sign up at the Google Cloud Console and enable the Gemini API.
   - Generate an API key and store it securely.

2. **Secure Storage**:
   - **Hardcoded (Development Only)**: Replace the `API_KEY` constant in `popup.js`.
   - **Recommended**: Use `chrome.storage.local`:
     ```javascript
     chrome.storage.local.set({ geminiApiKey: "your-api-key-here" });
     ```
     Retrieve it in `popup.js` with:
     ```javascript
     chrome.storage.local.get(["geminiApiKey"], (result) => {
       const API_KEY = result.geminiApiKey;
       // Use in fetch calls
     });
     ```

3. **API Endpoint**:
   - The extension uses the endpoint: `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`.

---

## File Structure

```
dsa-gemini-chatbot/
├── popup.html         # Main HTML structure for the popup
├── popup.js           # JavaScript logic and event handling
├── style.css          # Custom CSS styles
├── manifest.json      # Manifest V3 configuration
├── icon.png           # Extension icon (128x128px recommended)
```

---

## Contributing

1. **Fork the Repository**:
   - Create a personal fork on GitHub.

2. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Changes**:
   ```bash
   git commit -m "Add your feature description"
   ```

4. **Push and Submit a PR**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Open a pull request with a detailed description.

5. **Code Review**:
   - Ensure code adheres to guidelines and passes testing.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
