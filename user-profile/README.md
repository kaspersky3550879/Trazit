# \<user-profile>
Component user profile of trazit platform

## Installation

```bash
npm i user-profile
```

## Usage

```html
<script type="module">
  import 'user-profile/user-profile.js';
</script>

<user-profile></user-profile>
```



## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Requirements Tracking

This area want to track the requirements that made this web component to become a reality.

[- #193. Corporative Trazit Theme](https://github.com/FranGomezVenegas/FETR/issues/193)


## Fixed Bugs Tracking

This area want to track the bugs identified for this Web Component that were already implemented/fixed.

- Adapted to model 2.1 - credsChecker in new place.
- check, notify and stop when the new X value was not entered prior to click the button to perform the action