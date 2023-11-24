> :warning: Galxe docs have been moved to https://github.com/Galxe/docs. This repo is now deprecated and no longer maintained.

# galxe-docs

## CMS

This is yet to be optimized but here is a simple workflow for creating a new entry:

1. Go to https://docs.galxe.com/admin, then login with your github
2. Go to appropriate collection and page
3. Fill in required fields:
   1. Sidebar Label: Label to show in the sidebar.
   2. Sidebar Potision: Order of the current entry in the sidebar collection. Start from 1.
   3. Slug: Url of the current entry in the sidebar collection.
   4. Body: Must start with a title using "Heading 1"
4. Save
5. Go to workflow page https://docs.galxe.com/admin/#/workflow
6. (TODO) If you drag your document to "in review", or "ready", it should create a pull request to the repo
7. If you have write permission to this repo, you can click "publish now" to publish the entry
8. Our doc is hosted on netlify, so it will take about 2 minutes to take effect

## GraphQL documentation

Generate GraphQL documentation using our [production endpoint](https://graphigo.prd.galaxy.eco/query) with the following command:

```
yarn run doc:gen-graphql
```
