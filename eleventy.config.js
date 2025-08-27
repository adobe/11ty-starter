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

import dotenvFlow from "dotenv-flow";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { getAllPosts, onlyMarkdown } from "./config/collections.js";
import filters from "./config/filters.js";
import plugins from "./config/plugins.js";
import events from "./config/events.js";
import { lang, siteDescription, siteName, url } from "./src/data/meta.js";

dotenvFlow.config();

export default async function (eleventyConfig) {
  // framework options
  eleventyConfig.setQuietMode(true);
  eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });
  eleventyConfig.setLiquidOptions({ jsTruthy: true });
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "allPosts",
      limit: 10,
    },
    metadata: {
      language: lang,
      title: siteName,
      subtitle: siteDescription,
    },
  });

  // libs
  eleventyConfig.setLibrary("md", plugins.markdownLib);
  eleventyConfig.addLiquidFilter("markdown", (content) => {
    if (!content) return;
    return plugins.markdownLib.render(content);
  });

  // plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);

  // filters
  eleventyConfig.addFilter("toIsoString", filters.toISOString);
  eleventyConfig.addFilter("formatDate", filters.formatDate);
  eleventyConfig.addFilter("isLinkActive", filters.isLinkActive);
  eleventyConfig.addFilter("slugify", filters.slugifyString);
  eleventyConfig.addFilter("absoluteUrl", (href) => `${url}${href}`);

  // collections
  eleventyConfig.addCollection("allPosts", getAllPosts);
  eleventyConfig.addCollection("onlyMarkdown", onlyMarkdown);

  // events
  eleventyConfig.on("afterBuild", events.minifyJsComponents);

  // passthroughs
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@spectrum-css/ui-icons/dist/medium": "assets/icons",
  });

  return {
    dir: {
      output: "dist",
      input: "src",
      data: "data",
      includes: "includes",
      layouts: "layouts",
    },
  };
}
