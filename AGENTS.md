<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep prediction transport, validation, and response parsing in one browser-safe API module so the existing service stays the sole prediction source.
- Use separate home, analysis, and science routes with a shared root header/footer so each page remains directly shareable.
- Keep raw response fields in expandable technical details so the classification screen remains readable.
- Pre-optimize React and shared UI dependencies together in Vite so late dependency discovery does not mix React module generations during preview updates.
