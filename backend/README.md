### 📦 Backend Setup Instructions

1. **Install Required Packages:**

   ```sh
   npm i
   ```

2. **Setup Environment Variables:**

   Make a copy of the `.env.local` file content to a new `.env` file and fill in the corresponding values. You can refer to the tutorials linked below for setting up Azure and Google login.

   <details>
   <summary>Click to copy environment variables</summary>

   ```sh
    NODE_ENV="dev"
    PORT=4000
    BASE_URL="http://localhost:4000"

    #change this into any string u like
    JWT_SECRET="mysecretwohoo123"

    # change this if you are using mongodb atlas
    DATABASE_URL="mongodb://127.0.0.1:27017"

    # Setup google login developer console
    # Tutorial: https://blog.logrocket.com/guide-adding-google-login-react-app/
    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""

   ```

 </details>

3. **Run Local Server:**

```sh
npm run dev
```

---

### ℹ️ Additional Information

- in backend/controllers/AuthController.js
  ```js
  // Validate microsoftMail prefix
  if (!microsoftMail.startsWith("16823")) {
    throw new CustomError(400, "Microsoft mail must start with 16823XXX");
  }
  // turn this back on to blocks non tpb fsrd 2023
  ```
