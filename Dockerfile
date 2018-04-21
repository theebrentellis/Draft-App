FROM node:carbon
WORKDIR /Users/BrentEllis/Projects/Draft App/Draft App Code/client
ADD . /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1234
CMD npm start

