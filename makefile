build:
	@docker build -t img_mongo dbContainer/.
setup:
	@docker exec server-test /bin/bash /var/workdir/startup.sh
	@docker stop server-test
	@docker start server-test
run:
		@docker run -p 49000:27017 --name=server-test -d img_mongo --storageEngine wiredTiger --config /data/dbconfig/mongodb.conf

start:
	@docker start server-test
stop:
	@docker stop server-test
clean:	stop
	@docker rm -v -f server-test
shell:
	@docker exec -it server-test /bin/bash
