# 🌐 Wi-Fi Search API Serverless

> A high-performance, lightweight backend API built for **Vercel Serverless Functions** designed to receive, validate, and process Wi-Fi network scanning data securely via POST requests.

---

## ✨ Features

* **⚡ Serverless Architecture:** Built on Vercel for instant scaling and zero server maintenance.
* **🔒 CORS Enabled:** Fully configured to accept secure payloads from cross-origin clients, mobile applications, and automation scripts.
* **🛡️ Request Validation:** Strict HTTP method enforcement (`POST`) and JSON payload structure verification.
* **🚀 Instant Deployment:** Plug-and-play setup ready for GitHub and Vercel integration.

---

## 📂 Project Structure

```text
wifi-search-api/
├── api/
│   └── wifi-receiver.js   # Main serverless API endpoint
├── package.json           # Project configurations & dependencies
└── vercel.json            # Vercel deployment & routing rules
