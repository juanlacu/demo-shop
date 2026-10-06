# Mateando · Jev Review demo

A minimal Next.js shop built to show
[Jev Review](https://github.com/juanlacu/jev-review): a GitHub Action that
reviews every pull request with [TypeSafe Jev](https://typesafe.ai) and posts
its findings as comments on the exact line of code.

The app is intentionally simple (catalog, product page, cart, and checkout) so
the attention stays on the review, not the domain. The `demo/*` branches carry
changes that look reasonable but hide the kind of bugs a busy reviewer
approves.

## What Jev is

Jev is TypeSafe's API for asking a model for **bounded, typed decisions**
(pick an option, give a score) instead of free text. Jev Review uses those
decisions as small steps in a pipeline and keeps the logic (thresholds, what
gets posted, what blocks a merge) in code:

```text
risk matrix
  -> profile each file (Choice + Score)
  -> select evidence: which diff hunk to look at (Choice)
  -> classify the bug mechanism (Choice)
  -> severity (Score)
  -> route to the right reviewer (Choice)
```

For each changed file it reads the full file plus the changes to related files
(the ones it imports or that import it), so it can flag a change that conflicts
with another change in the same pull request. It checks correctness, security,
reliability, compatibility, and missing tests.

## Installing the action

1. Add `.github/workflows/jev-review.yml`:

   ```yaml
   name: Jev Review
   on: pull_request

   permissions:
     contents: read
     pull-requests: write

   jobs:
     review:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: juanlacu/jev-review@main
           with:
             typesafe-api-key: ${{ secrets.TYPESAFE_API_KEY }}
   ```

2. Add your TypeSafe API key under **Settings → Secrets and variables →
   Actions** as `TYPESAFE_API_KEY`.

3. Open a pull request. The action posts a single review with one comment per
   finding.

Optional inputs: `path` (review only one folder) and `fail-on-blocking: "true"`
(fails the job when a finding requests changes; combined with a branch
protection rule, it blocks the merge).

Pull requests from forks don't receive secrets, so the review doesn't run on
them: push branches to the same repository.

## Demo pull requests

Each branch is `main` plus a single commit. The title and description used to
open each pull request are in [`demo/PRS.md`](demo/PRS.md).

| Branch | Pull request | What Jev should flag |
| --- | --- | --- |
| `demo/security` | Show reviews with basic formatting | Review text (written by customers) is injected as HTML → XSS |
| `demo/server-action` | Charge the price the customer saw when adding to the cart | The Server Action charges the price the browser sends → anyone can pay whatever they want |
| `demo/correctness` | Free shipping on orders from $50.000 | Uses `>` instead of `>=`: at exactly $50.000 shipping is charged, while the cart notice says it's free |
| `demo/cross-file` | `formatPrice` takes cents | `PriceTag` also changed but still passes pesos → the catalog shows prices 100 times smaller |
| `demo/test-gap` | Add discount coupons | New discount logic with no tests |
| `demo/clean` | Polish catalog and cart copy | Copy only: should post no comments |

Every branch passes typecheck, tests, and build. The bugs are still there.

To show that it doesn't repeat itself, once the review has run on
`demo/security`, push an empty commit:

```bash
git switch demo/security
git commit --allow-empty -m "Retrigger review"
git push
```

The action runs again and doesn't comment on lines it already commented on.

## Recreating the branches

The branches are built from the patches in `demo/patches/`:

```bash
scripts/demo-branches.sh          # creates the demo/* branches on top of main
scripts/demo-branches.sh --push   # also force-pushes them to origin
```

To run the demo again after opening the pull requests, close them, run the
script with `--push`, and open them again.

## Running the app

Requires Node.js 24+.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # tests for lib/
npm run typecheck
```
