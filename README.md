# Chrome Extensions Repository

Welcome to the **Chrome Extensions Repository**, a comprehensive hub for developing, testing, and maintaining Chrome browser extensions. This repository serves as a centralized location for multiple Chrome extensions, with a primary focus on the **  Gemini Chatbot** extension. Designed for developers, educators, and tech enthusiasts, this repo provides a robust framework for creating, customizing, and distributing extensions using Manifest V3. Below, you will find detailed instructions, project overviews, and guidelines to leverage this repository effectively.

---

## Table of Contents
- [Repository Overview](#repository-overview)
- [Projects Included](#projects-included)
- [Installation and Setup](#installation-and-setup)
- [Running Projects in Chrome Developer Mode](#running-projects-in-chrome-developer-mode)
- [Development Workflow](#development-workflow)
- [Contributing Guidelines](#contributing-guidelines)
- [Security Considerations](#security-considerations)
- [Testing and Debugging](#testing-and-debugging)
- [Deployment Process](#deployment-process)
- [License](#license)
- [Support and Community](#support-and-community)
- [Roadmap](#roadmap)

---

## Repository Overview

This GitHub repository is dedicated to housing a collection of Chrome extensions, each designed to enhance browser functionality with unique features. The flagship project, **  Gemini Chatbot**, integrates AI-driven   assistance using the Gemini API. The repository is structured to support multiple extensions, with modular codebases, shared utilities, and comprehensive documentation. It adheres to Manifest V3 standards, ensuring compatibility with modern Chrome versions and compliance with Google's security policies.

The repository is intended for both individual developers and collaborative teams, offering a scalable environment for extension development, testing, and deployment.

---

## Projects Included

### 1.   Gemini Chatbot
- **Description**: An interactive Chrome extension that provides   explanations, code examples, and problem-solving support via the Gemini API.
- **Features**:
  - Draggable popup interface.
  - Persistent chat history using `localStorage`.
  - Code formatting and copy functionality.
  - Enter key support with auto-clear.
- **Directory**: `/ -gemini-chatbot/`
- **Status**: Active development.

### Future Projects
- AI-powered web annotator.
- Custom productivity tracker.
- (Add more as developed)

---

## Installation and Setup

### Prerequisites
- Google Chrome browser (version 88+ recommended).
- Node.js and npm (for potential build tools, though not required for this project).
- Git for version control.
- A Gemini API key (optional, for   Gemini Chatbot).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/chrome-extensions.git
   cd chrome-extensions
   ```

2. **Navigate to Project**:
   - For   Gemini Chatbot, enter the directory:
     ```bash
     cd  -gemini-chatbot
     ```

3. **Configure API Key** (for   Gemini Chatbot):
   - Open `popup.js` and set the `API_KEY`:
     ```javascript
     const API_KEY = "your-gemini-api-key-here";
     ```
   - Or use `chrome.storage.local` for security (see [Security Considerations](#security-considerations)).

4. **Install Dependencies** (if any):
   - Currently, no dependencies are required, but check for updates in `package.json` if added.

---

## Running Projects in Chrome Developer Mode

To test and run the extensions (e.g.,   Gemini Chatbot) in Chrome, follow these detailed steps:

### Step-by-Step Guide
1. **Enable Developer Mode**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Toggle the "Developer mode" switch in the top-right corner to the on position.

2. **Load the Unpacked Extension**:
   - Click the "Load unpacked" button.
   - Select the project directory (e.g., `/ -gemini-chatbot/`) from your cloned repository.
   - Chrome will load the extension, and its icon will appear in the toolbar.

3. **Verify Functionality**:
   - Click the extension icon to open the popup.
   - Enter a   query (e.g., "Explain merge sort") and press "Enter" to test.
   - Check the Chrome DevTools console (`right-click > Inspect > Console`) for errors.

### Troubleshooting Loading Issues
- **Manifest Errors**: Ensure `manifest.json` is valid (use a JSON validator).
- **Missing Files**: Verify all files (`popup.html`, `popup.js`, `style.css`, `icon.png`) are present.
- **Permissions**: Confirm the required permissions (`scripting`, `activeTab`, `storage`) are listed.

### Hot Reloading
- After making changes, click the "Refresh" button next to the extension in `chrome://extensions/` to reload without unloading.

---

## Development Workflow

### Branching Strategy
- Use `main` for stable releases.
- Create feature branches (e.g., `feature/ -chat-enhancement`) for new development.
- Submit pull requests for review.

### Commit Guidelines
- Follow the Conventional Commits format:
  ```plaintext
  feat: add enter key support
  fix: resolve copy paste indentation
  docs: update README
  ```

### Build Process
- No build step is currently required; the project uses raw files.
- Future additions may include a build script (e.g., using Webpack).

---

## Contributing Guidelines

1. **Fork the Repository**:
   - Create a fork on GitHub.

2. **Clone and Branch**:
   ```bash
   git clone https://github.com/your-username/chrome-extensions.git
   cd chrome-extensions
   git checkout -b feature/new-feature
   ```

3. **Implement Changes**:
   - Adhere to coding standards and test thoroughly.

4. **Push and PR**:
   ```bash
   git push origin feature/new-feature
   ```
   Open a pull request with a detailed description and tests.

5. **Review Process**:
   - Code will be reviewed for quality and security.

---

## Security Considerations

- **API Key Management**:
  - Avoid hardcoding API keys in source files. Use `chrome.storage.local`:
    ```javascript
    chrome.storage.local.set({ geminiApiKey: "your-key-here" });
    ```
  - Retrieve with:
    ```javascript
    chrome.storage.local.get(["geminiApiKey"], (result) => console.log(result.geminiApiKey));
    ```

- **Content Security Policy (CSP)**:
  - Ensure `manifest.json` includes a CSP to prevent XSS attacks.

- **Proxy Recommendation**:
  - For production, use a backend proxy to hide the API key.

---

## Testing and Debugging

- **Unit Testing**: Use Jasmine or Mocha (to be added).
- **Manual Testing**: Test all features in Chrome Developer Mode.
- **Debugging**: Use Chrome DevTools (F12) to inspect network requests and errors.

---

## Deployment Process

1. **Package the Extension**:
   - Zip the project directory.
   - Upload to the Chrome Web Store via the Developer Dashboard.

2. **Versioning**:
   - Update `manifest.json` version field and commit changes.

3. **Publish**:
   - Submit for review and publish after approval.

---

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.
