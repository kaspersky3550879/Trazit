# \<my-certifications>
Component my certifications of trazit platform

## Installation

```bash
npm i my-certifications
```

## Usage

```html
<script type="module">
  import 'my-certifications/my-certifications.js';
</script>

<my-certifications></my-certifications>
```



## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

This component is 'hardly-connected' to the frontend in the way that the button to be displayed for certification-purposes depends on the property that should be part of and called certification_level.
The main reason is that each object can be linked to a different certification type and there are types 
that are simpler or more complex and even depending on the current stage it should look in one way or the other. This is handled by the Backend and then and as to make it simple for the Frontend those are the relevant sub-properties:
  action_visible: true/false. To determine whether or not the button should be visible? 
  action_enabled: true/false. To determine when visible, enable or disabled?
  endpoint_name: The name of the action to be performed, as said above, the level is just the type but      depending on the current stage the next action might be one or another. Again, it is the Backend which determines that, the Frontend should just use it to generate the request/action.
  label_en/es: the label to display.


