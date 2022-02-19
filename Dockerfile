FROM node:16
WORKDIR /app
ENV PORT=3000
COPY . .
RUN npm install --production
CMD [ "node", "app.js" ]
EXPOSE 3000