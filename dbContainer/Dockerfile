FROM mongo:latest
MAINTAINER Marco Jasso

USER root

#RUN apt-get update
#RUN apt-get install -y pskill


RUN mkdir /var/workdir
RUN chown -R mongodb:mongodb /var/workdir

#create development log file
RUN touch /var/workdir/test.log
RUN chown mongodb:mongodb /var/workdir/test.log

COPY startup.sh /var/workdir/startup.sh
COPY dbSetup.js /var/workdir/dbSetup.js
RUN chown mongodb:mongodb /var/workdir/startup.sh
RUN chown mongodb:mongodb /var/workdir/dbSetup.js

RUN chmod +x /var/workdir/startup.sh
#RUN /bin/bash /var/workdir/startup.sh


RUN rm /entrypoint.sh
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["mongo"]
