FROM node:20-alpine

# Define the work directory inside the container
WORKDIR /app

# Copy only package files first (Docker cache optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of backend code
COPY . .

# API PORT
EXPOSE 3080

CMD ["npm", "run", "dev"]