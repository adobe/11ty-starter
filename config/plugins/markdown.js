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

import markdownIt from "markdown-it";
import markdownItPrism from "markdown-it-prism";
import markdownItClass from "@toycode/markdown-it-class";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import { full as markdownItEmoji } from "markdown-it-emoji";
import markdownItEleventyImg from "markdown-it-eleventy-img";
import markdownItFootnote from "markdown-it-footnote";
import markdownitMark from "markdown-it-mark";
import markdownitAbbr from "markdown-it-abbr";
import { slugifyString } from "../filters/slugify.js";
import path from "node:path";

export const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .disable("code")
  .use(markdownItPrism, {
    defaultLanguage: "plaintext",
  })
  .use(markdownItClass, {
    ol: "list",
    ul: "list",
  })
  .use(markdownItLinkAttributes, [
    {
      matcher(href) {
        return href.match(/^https?:\/\//);
      },
      attrs: {
        rel: "noopener",
      },
    },
  ])
  .use(markdownItEmoji)
  .use(markdownItEleventyImg, {
    imgOptions: {
      widths: [440, 880, 1024],
      urlPath: "/assets/images/",
      outputDir: "./dist/assets/images/",
      formats: ["webp", "jpeg"],
    },
    globalAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "90vw",
    },
    // prepend src for markdown images
    resolvePath: (filepath, env) => {
      return path.join("src", filepath);
    },
    renderImage(image, attributes) {
      const [Image, options] = image;
      const [src, attrs] = attributes;

      Image(src, options);

      const metadata = Image.statsSync(src, options);
      const imageMarkup = Image.generateHTML(metadata, attrs, {
        whitespaceMode: "inline",
      });

      const imageElement = attrs.title
        ? `<figure class="flow">
			${imageMarkup}
					<figcaption>${attrs.title}</figcaption>
				</figure>`
        : `${imageMarkup}`;

      return imageElement;
    },
  })
  .use(markdownItFootnote)
  .use(markdownitMark)
  .use(markdownitAbbr);
