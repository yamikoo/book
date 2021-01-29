FROM node:12.20.1-alpine

WORKDIR /app

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init && \
    npm install -g create-nuxt-app


ENV HOST 0.0.0.0

CMD ["npm", "run", "dev"]