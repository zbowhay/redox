import { config } from './config';
import axios from 'axios';

const auth = {
  username: config.GITHUB_USER,
  password: config.GITHUB_TOKEN,
};

interface GithubPullRequest {
  id: number;
  state: string;
  title: string;
  user: any;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  mergedAt: string | null;
  mergeCommitSha: string;
  assignee: any[];
  assignees: any[];
  requestedReviewers: any[];
  requestedTeams: any[];
}

const getAllPullRequestsByRepo = async (repo: string): Promise<GithubPullRequest[]> => {
  console.time(`total-${repo}`);
  const responses: any[] = [];

  // gather first page
  console.time(`firstPage-${repo}`);
  const url = `${config.GITHUB_BASE_URL}/repos/ramda/${repo}/pulls?state=all&per_page=100`;
  const firstPage = await axios.get(url, { auth });
  responses.push(...firstPage.data);
  console.timeEnd(`firstPage-${repo}`);

  // if there are additional pages gather all of those simultaneously
  console.time(`remaining-${repo}`);
  const linkHeader = firstPage.headers.link;
  if (typeof linkHeader !== 'undefined') {
    const lastPageRegex = /next.*page=(\d+).*last"$/;
    const lastPageResult = linkHeader.match(lastPageRegex);
    const lastPage = lastPageResult !== null ? parseInt(lastPageResult[1]) : 0;

    // we have page 1, so we start at 2.
    const remainingPages: any[] = [];
    for (let i = 2; i <= lastPage; i++) {
      const request = axios.get(`${url}&page=${i}`, { auth });
      remainingPages.push(request);
    }

    const reaminingResponses = await Promise.all(remainingPages);
    reaminingResponses.forEach(r => responses.push(...r.data));
  }
  console.timeEnd(`remaining-${repo}`);

  // return subset of the data
  console.time(`map-${repo}`);
  const final = responses.map(data => ({
    id: data.id,
    number: data.number,
    state: data.state,
    title: data.title,
    user: data.user,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    closedAt: data.closed_at,
    mergedAt: data.merged_at,
    mergeCommitSha: data.merge_commit_sha,
    assignee: data.assignee,
    assignees: data.assignees,
    requestedReviewers: data.requested_reviewers,
    requestedTeams: data.requested_teams,
  }));
  console.timeEnd(`map-${repo}`);

  console.timeEnd(`total-${repo}`);
  return final;
};

(async () => {
  // gather all ramda repos
  const reposResponse = (await axios.get<{ name: string }[]>(`${config.GITHUB_BASE_URL}/orgs/ramda/repos`, { auth }))
    .data;
  const repos: string[] = reposResponse.map(d => d.name);

  // gather all pull requests across all ramda repos
  console.time('total');
  const pullsForEachRepo = repos.map(repo => getAllPullRequestsByRepo(repo));
  const results = await Promise.all(pullsForEachRepo);
  console.timeEnd('total');

  // store all pull request data in a map where repo name is key
  const pulls: { [key: string]: GithubPullRequest[] } = {};
  results.forEach((r, i) => {
    const repo = repos[i];
    pulls[repo] = r;
  });

  // how many pull requests total?
  const totalPullRequests = Object.values(pulls).reduce((prev, curr) => (prev += curr.length), 0);
  console.log(totalPullRequests);

  // how many pull requests per repo?
  Object.entries(pulls).forEach(entry => {
    console.log(entry[0], entry[1].length);
  });
})();
