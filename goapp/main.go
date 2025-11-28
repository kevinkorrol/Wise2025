package main

import (
    "html/template"
    "log"
    "net/http"
    "os"
)

var pageTpl = template.Must(template.New("page").Parse(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>{{.Title}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style>
    html, body { height: 100%; margin: 0; background: #0b0e14; }
    header { color: #fff; padding: 8px 12px; font-family: system-ui, sans-serif; font-size: 14px; opacity: 0.7 }
    iframe { width: 100%; height: calc(100% - 30px); border: none; }
  </style>
</head>
<body>
  <header>{{.Title}}</header>
  {{.IframeURL}}</iframe>
</body>
</html>
`))

func main() {
    // Read environment configuration
    base := os.Getenv("GRAFANA_BASE_URL")
    if base == "" {
        base = "http://grafana:3000"
    }
    uid := os.Getenv("GRAFANA_DASHBOARD_UID")
    if uid == "" {
        uid = "abcd123" // placeholder—replace after creating dashboard
    }
    title := os.Getenv("GRAFANA_DASHBOARD_TITLE")
    if title == "" {
        title = "Hackathon Dashboard"
    }
    refresh := os.Getenv("GRAFANA_REFRESH")
    if refresh == "" {
        refresh = "5s"
    }

    // Construct iframe URL (kiosk mode removes Grafana chrome)
    // You can include your dashboard slug after UID; Grafana ignores it for access
    iframeURL := base + "/d/" + uid + "/dash?kiosk&orgId=1&refresh=" + refresh

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        data := struct {
            Title     string
            IframeURL string
        }{
            Title:     title,
            IframeURL: iframeURL,
        }
        if err := pageTpl.Execute(w, data); err != nil {
            log.Println("template error:", err)
            http.Error(w, err.Error(), http.StatusInternalServerError)
        }
    })

    log.Println("Go app listening on :8080 — open http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
