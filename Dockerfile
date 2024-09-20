FROM node:22.8.0

WORKDIR /socialnetwork-frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]
