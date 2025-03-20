# AI Prompt Enhancer 🚀

## Overview

AI Prompt Enhancer is designed to transform basic prompts into optimized, high-quality instructions for AI language models.

## 🌟 Features

- **Intelligent Prompt Enhancement**: Convert basic prompts into structured, context-rich instructions.
- **Multi-AI Provider Support**: Works with both Mistral and OpenAI.
- **Open Source**: Completely customizable and community-driven.
- **Security-Focused**: Built with API key protection as a priority.

## 🛠 Tech Stack

- **Frontend**:
  - React
  - Tailwind CSS
  - Radix UI Components
- **Backend**:
  - Node.js
  - Express.js
- **AI Providers**:
  - Mistral AI
  - OpenAI

## 📦 Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- API keys for Mistral AI or OpenAI

## 🚀 Quick Start

### Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/Rahulkhinchi03/prompt-enhancer.git
   cd prompt-enhancer
   ```

2. Setup Backend

   ```bash
   npm install
   npm run setup
   ```

3. Setup Frontend

   ```bash
   cd frontend
   npm install
   npm run setup
   ```

4. Run the Application

   ```bash
   # From project root
   npm run dev  # Starts both frontend and backend
   ```

## 🔐 API Key Security

This project includes several tools to help you manage API keys securely:

**Critical Configuration Step:**
The API key must be the same in two locations:

- Root `.env` file's `API_KEY`
- Frontend's `.env.development` file's `REACT_APP_API_KEY`

Example:

```
# In root .env
API_KEY=your_secure_api_key

# In frontend/.env.development
REACT_APP_API_KEY=your_secure_api_key  # Must match the root API_KEY
```

🚨 **Warning:**

- Mismatched API keys will cause authentication failures
- Always use the same secure key in both locations
- Never commit real API keys to version control

🚨 Warning:

Mismatched API keys will cause authentication failures
Always use the same secure key in both locations
Never commit real API keys to version control

### Setting Up Environment Variables

The `npm run setup` command helps you securely configure your environment:

- Creates a `.env` file based on `.env.example`
- Guides you through adding your API keys
- Installs security measures to prevent key exposure

### Encrypting Your Keys

For additional security, you can encrypt your API keys:

```bash
npm run encrypt-keys save  # Create encrypted backup
npm run encrypt-keys view  # View your stored keys
```

This creates an encrypted file that requires a password to access.

### Security Checks

Run security checks to ensure your repository is properly configured:

```bash
npm run security-check
```

### ⚠️ IMPORTANT

**Never commit API keys to Git repositories**. We've implemented multiple safeguards:

- Pre-commit hooks to catch accidental key commits
- Git ignorance of sensitive files
- Validation checks on startup

For more details, see [SECURITY.md](SECURITY.md).

## 🔐 Environment Configuration

The project uses `.env` files for configuration. Refer to `.env.example` for required variables.

### Backend Environment Variables

- `PORT`: Server port
- `AI_PROVIDER`: Choose between 'mistral' or 'openai'
- `MISTRAL_API_KEY`: Mistral AI API key
- `OPENAI_API_KEY`: OpenAI API key
- `API_KEY`: Authentication key for the API

### Frontend Environment Variables

- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_API_KEY`: API authentication key

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

# Project Attribution

## Creator

**Rahul Khinchi**

- GitHub: [@Rahulkhinchi03](https://github.com/Rahulkhinchi03)

## Powered By

### Treblle

<div align="center">
  <img src="https://github.com/user-attachments/assets/54f0c084-65bb-4431-b80d-cceab6c63dc3"/>
</div>
<div align="center">

**About Treblle:**
Treblle is an API Intelligence platform that empowers companies looking to connect the dots between APIs and their business development.  

**Treblle's Contribution:**

- Provided infrastructure and development support
- Enabled advanced API monitoring and management
- Supported open-source innovation

### Licensing and Rights

- Project Code: MIT License
- Treblle Logo and Branding: © Treblle
- Project Assets: © Rahul Khinchi

## 🙏 Acknowledgments

- Inspired by the need for better AI prompt engineering.
- Thanks to the open-source community.
- Powered by [Treblle](https://treblle.com)

## 📞 Support

Encounter an issue? [Open an issue](https://github.com/Rahulkhinchi03/prompt-enhancer/issues) on GitHub.

---

**Happy Prompting! 🎉**
