```mermaid

sequenceDiagram
  participant browser
  participant server

  Note right of browser: Render new note before sending to server.

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server-->>browser: JSON: {"message":"note created"}
  deactivate server

  Note right of browser: Content Type: application/json