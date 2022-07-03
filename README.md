# redox

Redox Coding Challenge

### Setup

You must create a `.env` file at root.

| key          | value | description                                                                                                                                                                       |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GITHUB_USER  |       | The GitHub username you want to authenticate with                                                                                                                                 |
| GITHUB_TOKEN |       | The [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) you want to authenticate with |

### Coding Challenge Description

For the coding task, we'll build a tool to analyze pull request traffic for a Github organization.

For the part you do on your own: write some code that will retrieve every pull request for the Ramda organization using the Github web API and store the results in memory. When we pair, we will use this collection of pull requests for analysis of things like patterns across PRs of different statuses. For example, we might answer a question like "how many pull requests were merged week over week across the organization?”

Do not use a pre-existing Github library. We want to see you interact directly with the Github API and use JavaScript or Typescript, ideally as a NodeJS console app. Other than that, use whatever tools (frameworks, etc) you like, structure your code however you like, etc. We care much more about how you solve technical problems generally than any specific knowledge and we want to see you at your best.

Here are some resources:
Ramda organization: https://github.com/ramda
Github API docs: https://developer.github.com/v3/  
If you want, feel free to use the new GraphQL API instead of the v3 REST API: https://developer.github.com/v4/

When you complete the take home task, please:
Let us know how many pull requests your project retrieves
Push your project to your Github account and send us a link to the repo - or if you'd rather not have it on your Github account, a link to Dropbox or an emailed zip file is fine, too
If you use a framework that generates boilerplate code, let us know which parts of the project to focus on
Drop the link into the slack channel that you have been invited to
