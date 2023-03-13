#
# Build stage 1.
# This state builds our Script and produces an intermediate Docker image containing the compiled JavaScript code.
#
FROM node:10 as builder
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

#
# Build stage 2.
# This stage pulls the compiled JavaScript code from the stage 1 intermediate image.
# This stage builds the final Docker image that we'll use in production.
#

FROM node:10
WORKDIR /usr/src/app
COPY ./server/package*.json ./
RUN npm install --only=production
COPY . .

# Using static files that was build in a stage 1
COPY --from=builder /usr/src/app/dist ./dist
#Copy static files to static directory
RUN rm -rf server/public/static && cp dist/static -r server/public/static && rm server/views/client.html && cp dist/index.html server/views/client.html

EXPOSE 3311
CMD [ "node", "server/server.js" ]
