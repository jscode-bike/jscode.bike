v0

- finish editor/sidebar functionality -X
- enrich hidden tests -X
- style arena components -X
- create home page and routing, with at least 1 more problem -X
- create timeout mechanism for long running user submitted code -X

as of 20aug20: v0 is DONE

v1

- add more problems
- add solutions
- create more informative dashboard on homepage
- build out header component
- make `message` and `error message` components more helpful
- different themes!!
- rebuild code running engine with improved functionality -P
  - singleton with kill switch -X
  - richer test data -X
  - live streaming results
- create localStorage context to store/fetch user data -X
- find alternative test delivery strategy that doesnt block UI rendering -X
- code split and dynamically load each problem -X

After v1 items are complete, apply for advertising

- research ad tech solutions
- styling and ad locations
- google ad sense
- carbon ads
- think of how to integrate solutions with ads

consider

- creating lightweight editor for mobile X
- solutions tab, or at least link to blog
- SEO, and/or potential migration to gatsby
- create sample tests area in arena
- clean up arena context and manage data better
- measure runtime of solution & grade accordingly
- integrating tabs with router, finding new solution for tabs w/ code splitting
  - progressively enhance arena to use panes with draggable tabs
- user defined timeout threshold
- caching network calls using service workers
- create data structures section for fundamentals practice
- fix cross-platform CSS issues

completed items

- disable submit button while streaming in tests so user can see and attempt challenge before waiting for all tests -X
- finding better solution for syntax highlighter in results
  - too slow; look into memoization or just new solution altogether
