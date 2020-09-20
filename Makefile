publish:

	git commit -am'bump :pray:'; git push; tsc && npm version patch && npm publish
