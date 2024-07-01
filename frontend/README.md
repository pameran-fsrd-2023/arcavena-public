### 📦 Frontend Setup Instructions

1. **Install Required Packages:**

   ```sh
   npm i
   ```

2. **Setup Environment Variables:**

   Make a copy of the `.env.local` file content to a new `.env` file and fill in the corresponding values. You can refer to the tutorials linked below for setting up Azure and Google login.

   <details>
   <summary>Click to copy environment variables</summary>

   ```sh
   VITE_BASE_URL="http://localhost:3000"
   VITE_BASE_BACKEND_URL="http://localhost:4000"

   # Setup Azure portal login
   # Tutorial: https://learn.microsoft.com/en-us/entra/identity-platform/tutorial-single-page-app-react-register-app
   VITE_AZURE_APPLICATION_ID=""
   VITE_AZURE_TENANT_ID=""

   # Setup Google login developer console
   # Tutorial: https://blog.logrocket.com/guide-adding-google-login-react-app/
   VITE_GOOGLE_CLIENT_ID=""
   ```

   </details>

3. **Run Local Server:**

   ```sh
   npm run dev
   ```

---

### 🚀 Deployment Instructions

Before deploying the frontend, you need to update the backend URL in your code to match the deployed backend port.

1. Open the file where the API call is made.

2. Find the following line:

   ```javascript
   const { data } = await axios.get("http://localhost:4000/profile/fsrd");
   ```

3. Change it to match your local backend port or your deployed backend URL:

   ```javascript
   const { data } = await axios.get("<YOUR_BACKEND_URL>/profile/fsrd");
   ```

   Replace `<YOUR_BACKEND_URL>` with the actual URL where your backend is hosted.

For example, if your backend is deployed at `https://api.example.com`, the line should be:

```javascript
const { data } = await axios.get("https://api.example.com/profile/fsrd");
```

---
