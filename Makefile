.PHONY: dist test
default: help
dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

	
help:
	@echo "    make dev 开发模式"
	@echo "    make build 编译模式"
	@echo "    make lint 格式校验"