FROM node:14-alpine 
WORKDIR /home/app/frontend
COPY *.json ./
COPY *.js ./
COPY ./public ./public
COPY ./src ./src
RUN npm install --only=prod
RUN npm run build
