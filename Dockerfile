FROM node:14-alpine 
WORKDIR /home/app/frontend
COPY *.json ./
COPY *.config.js ./
RUN npm ci

