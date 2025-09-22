# RUNBOOK.md

# Manish Industries Website Runbook

## Starting Development Servers

1. To start the client server:
   ```
   cd client && npm install && npm start
   ```

2. To start the server:
   ```
   cd server && npm install && npm start
   ```

3. To start both servers concurrently:
   ```
   concurrently "npm start --prefix client" "npm start --prefix server"
   ```
   (Note: This requires the `concurrently` package to be installed. You can add it to your project by running `npm install concurrently` in the root directory.)