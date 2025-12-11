FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm --prefix backend install
RUN npm --prefix frontend install

RUN npm --prefix backend run build
RUN npm --prefix frontend run build

EXPOSE 3080

CMD sh -c "npm --prefix backend run start & npm --prefix frontend run start"