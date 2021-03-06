FROM node:8
RUN npm install -g bower --save

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY package-lock.json .
COPY .env.development .env

RUN npm install
RUN bower install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]     

