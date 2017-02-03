build:
	@docker build -t img_mongo dbContainer/.
run:
	@docker run -p 49000:27017 --name=server-test -d img_mongo --storageEngine wiredTiger
start:
	@docker start server-test
stop:
	@docker stop server-test
clean:	stop
	@docker rm -v -f server-test
	#@docker rmi -f img_mongo
