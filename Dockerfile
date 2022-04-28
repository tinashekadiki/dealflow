FROM node:14-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@11.0.5
# If you are building your code for production
COPY . .
RUN ng build --prod

# Bundle app source
COPY . .

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/dealflow /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx/default.conf /etc/nginx/conf.d/ng.conf
RUN rm /etc/nginx/conf.d/default.conf

