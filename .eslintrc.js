module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
  },
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "no-cond-assign": [2, "except-parens"],
    "radix": 0,
    "space-infix-ops": 0,
    "no-unused-vars": [1, {"vars": "local", "args": "none"}],
    "default-case": 0,
    "no-else-return": 0,
    "no-param-reassign": 0,
    "quotes": 0,
    "no-alert": 0,
  }
};