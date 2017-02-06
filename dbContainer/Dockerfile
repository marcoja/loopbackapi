FROM mongo:latest
MAINTAINER Marco Jasso

USER root
RUN mkdir /var/workdir
RUN chown -R mongodb:mongodb /var/workdir

RUN apt-get update
RUN apt-get install -y vim file 

#create development log file
RUN touch /var/workdir/test.log
RUN chown mongodb:mongodb /var/workdir/test.log

#Create mongodb log directory
#RUN mkdir /var/log/mongodb
#RUN chown -R mongodb:mongodb /var/log/mongodb

#Sytratup script, it can be use for os level configurations and or debugging purposes.
COPY startup.sh /var/workdir/startup.sh
RUN chown mongodb:mongodb /var/workdir/startup.sh
RUN chmod +x /var/workdir/startup.sh
#RUN /bin/bash /var/workdir/startup.sh

#mongod configuration script
COPY mongodb.conf /data/dbconfig/mongodb.conf
RUN chown mongodb:mongodb /data/dbconfig/mongodb.conf

#script for initial database configuration
COPY dbSetup.js /var/workdir/dbSetup.js
RUN chown mongodb:mongodb /var/workdir/dbSetup.js
