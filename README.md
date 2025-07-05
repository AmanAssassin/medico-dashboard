# ⚙️ Device CRM + Inventory Management Dashboard

## 📌 Objective

Build a full-featured admin dashboard to manage medical device inventories, track installations, service visits, contract lifecycles (AMC/CMC), and maintain facility-specific CRM histories including training, feedback, and photo documentation.

---

## 🚀 Tech Stack

- ReactJS
- Redux
- Material UI
- SCSS Modules
- (Optional) `json-server` or `localStorage` for mock API

---

## 📦 Core Modules

1. **Device Inventory Dashboard**  
   Display a table or card layout for all devices with details like:

   - Type, ID, Facility
   - Status (Online/Offline/Maintenance)
   - Battery %, Last service/install date
   - AMC/CMC contract status

2. **Installation & Training Module**

   - Log new installations
   - Upload unboxing/setup photos
   - Complete checklists and training forms
   - Track training completion status

3. **Service Visit Logs**

   - Log field visits with notes, date, engineer name, and visit type (Preventive/Breakdown)
   - Attach photos or PDFs

4. **AMC/CMC Tracker**

   - Monitor AMC/CMC contract details
   - Highlight upcoming expiries
   - Export contract reports

5. **Alerts & Photo Logs**
   - Upload device condition photos
   - Log alerts or issues encountered during service or installation

---

## 🛠️ Getting Started

```bash
# Step 1: Clone the repository
git clone <YOUR_REPO_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```
