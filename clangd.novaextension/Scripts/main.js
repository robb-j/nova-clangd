class ClangdServer {
  client = null;
  path = null;

  start(path) {
    this.path = path;

    this.stop();

    const client = new LanguageClient(
      "robb-j.clangd",
      "Clangd-LSP",
      { type: "stdio", path },
      { syntaxes: ["cpp"], debug: false }
    );
    try {
      client.start();

      nova.subscriptions.add(client);
      this.client = client;
    } catch (error) {
      console.error(error);
    }
  }

  stop() {
    if (!this.client) return;

    this.client.stop();
    nova.subscriptions.remove(client);
    this.client = null;
  }

  restart() {
    this.stop();
    if (this.path) this.start(this.path);
  }
}

/** @type {ClangdServer | null} */
let server = null;

function activate() {
  console.log("activate");

  server = new ClangdServer();
  nova.config.observe("robb-j.clangd.path", (path) => server.start(path));
}

function deactivate() {
  console.log("deactivate");

  server?.stop();
  server = null;
}

nova.commands.register("robb-j.clangd.restart", () => {
  console.log("restart…");
  server?.restart();
});

module.exports = { activate, deactivate };
