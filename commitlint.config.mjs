// Conventional Commits + a board ticket, e.g. "feat(search): match plurals (OD-2)"
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "chore", "docs", "test", "refactor", "perf", "ci", "style", "revert"]],
    "subject-max-length": [2, "always", 72],
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
    "references-empty": [2, "never"],
  },
  parserPreset: { parserOpts: { issuePrefixes: ["OD-"] } },
};

export default config;
