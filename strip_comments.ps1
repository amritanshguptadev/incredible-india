$content = Get-Content 'css\style.css' -Raw
$stripped = $content -replace '/\*[\s\S]*?\*/', ''
$stripped = $stripped -replace '(?m)(^[ \t]*[\r\n])+', "`n"
$stripped | Out-File 'css\style.css' -Encoding UTF8
