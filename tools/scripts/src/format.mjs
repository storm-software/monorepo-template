#!/usr/bin/env zx
/* -------------------------------------------------------------------

            ⚡ Storm Software - Monorepo Template

 This code was released as part of the Monorepo Template project. Monorepo Template
 is maintained by Storm Software under the Apache-2.0 License, and is
 free for commercial and private use. For more information, please visit
 our licensing page.

 Website:         https://stormsoftware.com
 Repository:      https://github.com/storm-software/monorepo-template
 Documentation:   https://stormsoftware.com/projects/monorepo-template/docs
 Contact:         https://stormsoftware.com/contact
 License:         https://stormsoftware.com/projects/monorepo-template/license

 ------------------------------------------------------------------- */

import { $, argv, chalk, echo } from "zx";

try {
  echo`${chalk.whiteBright("🎨  Formatting the monorepo...")}`;

  let files = "";
  if (argv._ && argv._.length > 0) {
    files = `--files ${argv._.join(" ")}`;
  }

  let proc =
    $`pnpm nx run-many --target=lint,format --all --exclude="@monorepo-template/monorepo" --parallel=5`.timeout(
      `${30 * 60}s`
    );
  proc.stdout.on("data", data => {
    echo`${data}`;
  });
  let result = await proc;
  if (!result.ok) {
    throw new Error(
      `An error occured while formatting the monorepo: \n\n${result.message}\n`
    );
  }

  proc =
    $`pnpm nx format:write ${files} --sort-root-tsconfig-paths --all`.timeout(
      `${30 * 60}s`
    );
  proc.stdout.on("data", data => {
    echo`${data}`;
  });
  result = await proc;
  if (!result.ok) {
    throw new Error(
      `An error occured while running \`nx format:write\` on the monorepo: \n\n${result.message}\n`
    );
  }

  echo`${chalk.green("Successfully formatted the monorepo's files")}`;
} catch (error) {
  echo`${chalk.red(error?.message ? error.message : "A failure occurred while formatting the monorepo")}`;

  process.exit(1);
}
