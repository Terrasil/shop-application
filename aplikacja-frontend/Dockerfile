FROM node:16.6.1
WORKDIR /
COPY . /
ENTRYPOINT ["/bin/sh"]
RUN npm install --production
CMD ["start.sh"]