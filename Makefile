# Makefile for Playwright Practice Software
#
# This Makefile provides commands for testing, code quality checks, and housekeeping.

.PHONY: test format lint check clean help

# ==============================================================================
# Testing
# ==============================================================================

test: ## Run Playwright tests
	npx playwright test

# ==============================================================================
# Code Quality
# ==============================================================================

format: ## Format code with Biome
	npx @biomejs/biome format . --write

lint: ## Lint code with Biome
	npx @biomejs/biome lint . --write

check: ## Run all Biome checks
	npx @biomejs/biome check . --write

# ==============================================================================
# Housekeeping
# ==============================================================================

clean: ## Remove test results and reports
	rm -rf test-results playwright-report

# ==============================================================================
# Help
# ==============================================================================

help: ## Display this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'