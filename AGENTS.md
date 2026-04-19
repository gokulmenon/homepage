## Agents

### Checks

This repository includes automated AI checks located in `.continue/checks/`.

Before opening a pull request, you can run the checks locally:

1. Install the check skill:

```bash
npx skills add continuedev/skills --skill check
```

2. Run checks against the current working tree:

```bash
/check
```

The checks live in `.continue/checks/*.md` and will run on PRs when connected to Continue Mission Control.
