.PHONY: dist test
default: help
dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

new:
	npm run new

	
help:
	@echo "    make dev 开发模式"
	@echo "    make build 编译模式"
	@echo "    make new 通过自动化流程创建代码"
	@echo "    make lint 格式校验"