.PHONY: dist test
default: help
dev:
	npm run dev

build:
	npm run build

	
help:
	@echo "    make dev 开发模式"
	@echo "    make build 编译模式"