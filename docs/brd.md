# PYGMI - Text-to-Image Generator

## Business Requirements Document (BRD) - MVP

---

## 1. Overview

PYGMI adalah aplikasi text-to-image generator yang memungkinkan user membuat gambar dari text prompt.

---

## 2. Target User

**General User** — Siapa saja yang ingin generate gambar dari text.

---

## 3. Features

### 3.1 Authentication

| ID      | Feature  | Description           |
| ------- | -------- | --------------------- |
| AUTH-01 | Register | Name, Email, Password |
| AUTH-02 | Login    | Email, Password       |
| AUTH-03 | Logout   | Logout button         |

### 3.2 Image Generation

| ID     | Feature          | Description                        |
| ------ | ---------------- | ---------------------------------- |
| GEN-01 | Text Prompt      | Input text untuk generate gambar   |
| GEN-02 | Add Reference    | Upload reference image (optional)  |
| GEN-03 | Number of Images | Pilih jumlah output (1-4)          |
| GEN-04 | Aspect Ratio     | Pilih ratio (1:1, 16:9, 9:16)      |
| GEN-05 | HDR Toggle       | On/Off HDR mode                    |
| GEN-06 | Model Selection  | Pilih AI model (Seedream 4.5)      |
| GEN-07 | Generate Button  | Tombol generate dengan credit cost |

### 3.3 Gallery / Library

| ID     | Feature     | Description                        |
| ------ | ----------- | ---------------------------------- |
| GAL-01 | My Generate | Lihat semua hasil generate         |
| GAL-02 | Task View   | View per task/batch                |
| GAL-03 | Copy        | Copy prompt                        |
| GAL-04 | Rerun       | Generate ulang dengan setting sama |
| GAL-05 | Re-use      | Load prompt ke generator           |
| GAL-06 | Download    | Download gambar                    |

### 3.4 Credits

| ID     | Feature        | Description                     |
| ------ | -------------- | ------------------------------- |
| CRD-01 | Credit Balance | Tampilkan sisa credit di header |
| CRD-02 | Buy Credits    | Tombol beli credit              |

### 3.5 Navigation

| ID     | Feature     | Description             |
| ------ | ----------- | ----------------------- |
| NAV-01 | Explore     | Halaman explore         |
| NAV-02 | Imagine     | Halaman generate (main) |
| NAV-03 | My Generate | Library hasil generate  |
| NAV-04 | Organize    | Organize/folder         |

---

## 4. Pages

| Page        | URL           | Description                |
| ----------- | ------------- | -------------------------- |
| Register    | `/register` | Form register              |
| Login       | `/login`    | Form login                 |
| Imagine     | `/imagine`  | Main page - generate image |
| My Generate | `/library`  | Gallery hasil generate     |
| Explore     | `/explore`  | Explore page               |

---

## 5. User Flow

```
Register → Login → Imagine (generate) → My Generate (view results)
```

---

## 6. Tech Stack

| Layer    | Technology   |
| -------- | ------------ |
| Frontend | Next.js      |
| Backend  | Node.js      |
| Database | PostgreSQL   |
| Storage  | AWS S3       |
| AI Model | Seedream API |

---

*End of Document*
