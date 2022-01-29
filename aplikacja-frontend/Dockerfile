FROM node:16.6.1
WORKDIR /
COPY . /
ENTRYPOINT ["/bin/sh"]
RUN rm -rf node_modules
RUN rm package-lock.json
RUN npm cache clear --force
RUN npm install
CMD ["start.sh"]