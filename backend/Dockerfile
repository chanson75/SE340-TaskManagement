FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Add a script to initialize the database
COPY init-db.sh /usr/src/app/init-db.sh
RUN chmod +x /usr/src/app/init-db.sh

# Run the initialization script before starting the server
CMD ["/usr/src/app/init-db.sh"]
