# Copilot Instructions

This document serves as an index to task-specific instructions for GitHub Copilot. Each task has its own detailed instructions file in the `.github/instructions` directory.

## Install and Build

- Packages are located in the `packages` folder
- Use `pnpm` as the package manager
- Use `pnpm install` to install dependencies
- Use `pnpm build` to build every package
- Use `pnpm -r --filter "<pkgName>..." build` to build to a specific package `<pkgName>`
- Use `pnpm format` to format all files

