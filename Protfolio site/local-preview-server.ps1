$root = (Resolve-Path ".").Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:4173/")
$listener.Start()

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($path)) {
    $path = "index.html"
  }

  $file = Join-Path $root $path
  if ((Resolve-Path $file -ErrorAction SilentlyContinue).Path -notlike "$root*") {
    $context.Response.StatusCode = 403
    $context.Response.Close()
    continue
  }

  if (-not (Test-Path $file -PathType Leaf)) {
    $context.Response.StatusCode = 404
    $context.Response.Close()
    continue
  }

  $extension = [IO.Path]::GetExtension($file).ToLowerInvariant()
  $contentType = switch ($extension) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".png" { "image/png" }
    default { "application/octet-stream" }
  }

  $bytes = [IO.File]::ReadAllBytes($file)
  $context.Response.ContentType = $contentType
  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.Close()
}
