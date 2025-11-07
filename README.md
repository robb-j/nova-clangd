# Clangd

This is a proof-of-concept LanguageClient for [Nova](https://nova.app).
I wanted to see if clangd was a better LSP for Arduino-based projects
than SourceKit which [Icarus](https://extensions.panic.com/extensions/panic/panic.Icarus/) uses.

It works better for Arduino but I don't see myself publishing this extension right now.
The main issue is that Icarus provides syntax highlighting for c/cpp
but does not allow you to opt-out of their LSP.

For my own development I cloned the Queries and Syntaxes folders into this extension
and disabled Icarus which got this working and linting cpp files better.

I also discovered a hack where you can trick Icarus into running clangd anyway
by setting `/usr/bin/clangd` as the language server path in settings.
