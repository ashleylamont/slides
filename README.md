# slides

An ongoing pile of talks, experiments, and questionable presentation ideas.
They are React components rendered with open-slide.

Each deck lives in `slides/<deck-name>/index.tsx` and exports an ordered list
of pages. This is nice because the slides are just code: easy to tweak, easy to
reuse, and no one has to drag a text box two pixels to the left ever again.

## Run a deck

```bash
npm install
npm run dev
```

Use the browser UI to pick a deck. Press `F` to present; arrow keys move
through pages and stepped reveals.

```bash
npm run build
npm run preview
```

The canvas is 1920 × 1080. Assets for a deck live beside it in
`slides/<deck-name>/assets/`; shared bits go in `assets/`.

## Currently here

`slack-emoji-filesystem` is the one where I tried to build a filesystem out of
Slack custom emoji. It is a bad storage idea and a very fun way to learn how
filesystems work.

## Assets

See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) for the licensing scope
of presentation assets.
