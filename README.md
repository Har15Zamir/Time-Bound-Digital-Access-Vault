# Vault Project — Time-Bound Digital Access Vault

Vault Project is a secure, full-stack web application designed for sharing sensitive information through temporary, rule-governed links. By enforcing strict access controls on the backend, Vault ensures that your data remains private and ephemeral.



## 🚀 Overview

The system allows users to "vault" sensitive content and generate unique URLs with built-in expiration logic. Whether you need a link to expire after one view or after one hour, Vault handles the validation and provides a permanent audit trail for security monitoring.

**Status:** 🚧 *Work in Progress*

---

## ✨ Features

* **Secure Authentication:** User registration and login system.
* **Encapsulated Vaults:** Create and store sensitive text-based entries.
* **Smart Sharing Rules:**
    * **TTL (Time-to-Live):** Set specific expiration timestamps.
    * **View Limits:** Automatically burn the link after $X$ number of views.
    * **Password Protection:** Optional secondary layer of security for shared links.
* **Backend Validation:** All rules are enforced server-side to prevent unauthorized access.
* **Audit Logging:** Immutable logs tracking every action taken on vault items.

---

## 📂 Project Structure

```text
project/
├── frontend/               # Client-side interface
│   ├── login.html          # User authentication
│   ├── register.html       # Account creation
│   ├── dashboard.html      # Overview of user vaults
│   ├── create_vault.html   # Vault creation interface
│   ├── share_vault.html    # Link generation settings
│   ├── access.html         # Public-facing access portal
│   ├── logs.html           # Audit trail viewer
│   ├── style.css           # Global styling
│   └── script.js           # Frontend logic & API calls
├── backend/                # Server-side logic
│   ├── app.py              # Flask API routes & logic
│   ├── init_db.py          # Database schema initialization
│   └── database.db         # SQLite storage
└── README.md               # Documentation
