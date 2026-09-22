"""Dev server for the portfolio.

Deliberately not `python3 -m http.server`: that module builds its argument
parser with `default=os.getcwd()`, which raises PermissionError when the
process inherits a working directory it can no longer read (e.g. a scratch
folder that has been removed). Importing the handler class skips that code
path entirely, and we pin the served root to an absolute path.
"""

import os
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173


class Handler(SimpleHTTPRequestHandler):
    """Serve with caching off so an edit is always the thing you reload."""

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()


def main():
    try:
        os.chdir(ROOT)
    except OSError:
        pass  # the handler is pinned to ROOT anyway

    httpd = ThreadingHTTPServer(("127.0.0.1", PORT), partial(Handler, directory=ROOT))
    print(f"serving {ROOT} on http://127.0.0.1:{PORT}", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()


if __name__ == "__main__":
    main()
