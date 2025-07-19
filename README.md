## 🐂 BullMQ Batch Processing with NestJS

This project demonstrates a basic **BullMQ** batch processing implementation using **NestJS**. It supports:

* ✅ **Scheduled batch jobs** that run automatically at specific intervals (e.g. 3AM daily)
* ✅ **Manual trigger** via `POST` request to run the batch process on demand
* 🔧 Redis is required and must be configured properly

---

### 📦 Requirements

* Node.js
* NestJS
* Redis
* BullMQ (`@nestjs/bull`)

---

### 🚀 Features

* ⏰ **Cron-based processing**
  Automatically queues and processes jobs at **3:00 AM daily** using `@nestjs/schedule`.

* 📬 **Manual job triggering**
  Hit a POST endpoint to manually enqueue a batch processing job.

* 🧵 **Worker setup**
  Jobs are processed using a dedicated queue processor.

---

### ⚙️ Setup Instructions

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Ensure Redis is running**

   > Default connection is `localhost:6379`. You can customize this in your `BullModule.forRoot()` config.

3. **Run the application**

   ```bash
   npm run start
   ```

---

### 🧪 Manual Trigger Example

Send a POST request to:

```
POST /batch/run
```

This adds a job to the batch queue immediately.

---

### 🛠 File Structure Overview

```
src/
│
├── app.module.ts            → Imports Bull & Schedule modules
├── cron.service.ts          → Schedules job to run every minute
├── batch.processor.ts       → Processes jobs added to the batch queue
├── batch.controller.ts      → Handles manual job triggering via HTTP
```

---

### ⏰ Cron Schedule Used

```ts
@Cron('* * * * *') // Runs every day at 3:00 AM
```

---

### 💡 Notes

* Make sure Redis is running locally or update your Redis config accordingly.
* Logs will show when jobs are scheduled, enqueued, and processed.

---