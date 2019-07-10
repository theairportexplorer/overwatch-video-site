.PHONY: test

test:
	pytest OverwatchDB/ --junit-xml=./test_reports/results.xml 