FROM kkarczmarczyk/node-yarn:7.6 as app

MAINTAINER Gabriel Poca gabrielpoca@gmail.com

# setup a folder to cache node_modules
WORKDIR /tmp
COPY package.json /tmp/
COPY yarn.lock /tmp/

# install node_modules
RUN yarn install

# setup /app for source code
WORKDIR /app

# copy client source to /app
COPY . /app

# load cached node_modules
RUN cp -a /tmp/node_modules /app

# build cleint
ENV NODE_ENV=production
RUN yarn run build
