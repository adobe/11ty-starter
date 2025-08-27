/*!
 * Copyright 2025 Adobe. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at <http://www.apache.org/licenses/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import fs from "fs";
import path from "path";
import { minify } from "terser";

export const minifyJsComponents = async () => {
  const scriptsDir = "dist/assets/scripts";

  const minifyJsFilesInDir = async (dir) => {
    const files = fs.readdirSync(dir);
    for (const fileName of files) {
      const filePath = path.join(dir, fileName);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await minifyJsFilesInDir(filePath);
      } else if (fileName.endsWith(".js")) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const minified = await minify(fileContent);
        if (minified.error) {
          console.error(`Error minifying ${filePath}:`, minified.error);
        } else {
          fs.writeFileSync(filePath, minified.code);
        }
      } else {
        console.log(`No .js files to minify in ${filePath}`);
      }
    }
  };

  await minifyJsFilesInDir(scriptsDir);
};
