FROM node:latest 

WORKDIR /src

EXPOSE 8080

CMD [ "node", "hierarchy.js" ] 
